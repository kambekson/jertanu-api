import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Role } from '../../roles/enums/role.enum';
import { TourEntity } from '../../tours/entities/tour.entity';
import { Review } from '../../tours/entities/review.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  role: Role;

  @OneToMany(() => TourEntity, tour => tour.createdBy)
  createdTours: TourEntity[];

  @ManyToMany(() => TourEntity, tour => tour.favoritedBy)
  favoriteTours: TourEntity[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 