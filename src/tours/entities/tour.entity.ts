import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from '../../users/user.entity';
import { Review } from './review.entity';

export enum TourType {
  ETHNO = 'ethno',
  NATURE = 'nature',
  CULTURAL = 'cultural',
  ADVENTURE = 'adventure',
  GASTRO = 'gastronomy',
  OTHER = 'other'
}

export enum TourStatus {
  HOT = 'hot',
  SEASONAL = 'seasonal',
  NEW_DESTINATION = 'new_destination',
  REGULAR = 'regular'
}

@Entity('tours')
export class TourEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  city: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountPrice: number;

  @Column({
    type: 'enum',
    enum: TourType,
    default: TourType.OTHER
  })
  type: TourType;

  @Column({
    type: 'enum',
    enum: TourStatus,
    default: TourStatus.REGULAR
  })
  status: TourStatus;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;
  
  @Column('simple-array', { nullable: true })
  imageUrls: string[];

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column('int', { default: 0 })
  totalReviews: number;

  @ManyToOne(() => UserEntity, user => user.createdTours)
  createdBy: UserEntity;

  @OneToMany(() => Review, review => review.tour)
  reviews: Review[];

  @ManyToMany(() => UserEntity, user => user.favoriteTours)
  @JoinTable()
  favoritedBy: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}