import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/user.entity';
import { TourEntity } from './tour.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  rating: number;

  @Column('text', { nullable: true })
  comment: string;

  @ManyToOne(() => UserEntity, user => user.reviews)
  user: UserEntity;

  @ManyToOne(() => TourEntity, tour => tour.reviews)
  tour: TourEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 