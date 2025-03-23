import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Role } from '../../roles/enums/role.enum';
import { Tour } from '../../tours/entities/tour.entity';
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

  @OneToMany(() => Tour, tour => tour.createdBy)
  createdTours: Tour[];

  @ManyToMany(() => Tour, tour => tour.favoritedBy)
  favoriteTours: Tour[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 