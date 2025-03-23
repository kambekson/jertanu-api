import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './entities/tour.entity';
import { Review } from './entities/review.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private toursRepository: Repository<Tour>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createTourDto: CreateTourDto, user: UserEntity): Promise<Tour> {
    const tour = this.toursRepository.create({
      ...createTourDto,
      createdBy: user,
    });
    return this.toursRepository.save(tour);
  }

  async findAll(): Promise<Tour[]> {
    return this.toursRepository.find({
      relations: ['reviews', 'favoritedBy'],
    });
  }

  async findOne(id: number): Promise<Tour> {
    const tour = await this.toursRepository.findOne({
      where: { id },
      relations: ['reviews', 'favoritedBy'],
    });
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }
    return tour;
  }

  async update(id: number, updateTourDto: UpdateTourDto, user: UserEntity): Promise<Tour> {
    const tour = await this.findOne(id);
    if (tour.createdBy.id !== user.id) {
      throw new ForbiddenException('You can only update your own tours');
    }
    Object.assign(tour, updateTourDto);
    return this.toursRepository.save(tour);
  }

  async remove(id: number, user: UserEntity): Promise<void> {
    const tour = await this.findOne(id);
    if (tour.createdBy.id !== user.id) {
      throw new ForbiddenException('You can only delete your own tours');
    }
    await this.toursRepository.remove(tour);
  }

  async addReview(tourId: number, createReviewDto: CreateReviewDto, user: UserEntity): Promise<Review> {
    const tour = await this.findOne(tourId);
    const review = this.reviewsRepository.create({
      ...createReviewDto,
      tour,
      user,
    });
    await this.reviewsRepository.save(review);
    
    // Update tour's average rating
    const reviews = await this.reviewsRepository.find({ where: { tour: { id: tourId } } });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    tour.averageRating = totalRating / reviews.length;
    tour.totalReviews = reviews.length;
    await this.toursRepository.save(tour);

    return review;
  }

  async addToFavorites(tourId: number, user: UserEntity): Promise<Tour> {
    const tour = await this.findOne(tourId);
    if (!tour.favoritedBy) {
      tour.favoritedBy = [];
    }
    if (!tour.favoritedBy.some(u => u.id === user.id)) {
      tour.favoritedBy.push(user);
      await this.toursRepository.save(tour);
    }
    return tour;
  }

  async removeFromFavorites(tourId: number, user: UserEntity): Promise<Tour> {
    const tour = await this.findOne(tourId);
    if (tour.favoritedBy) {
      tour.favoritedBy = tour.favoritedBy.filter(u => u.id !== user.id);
      await this.toursRepository.save(tour);
    }
    return tour;
  }

  async getFavorites(user: UserEntity): Promise<Tour[]> {
    return this.toursRepository
      .createQueryBuilder('tour')
      .innerJoin('tour.favoritedBy', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }
} 