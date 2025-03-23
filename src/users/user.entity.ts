import { AfterInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Exclude } from "class-transformer";

import { ProfileEntity } from "../profiles/entities/profile.entity";
import { RoleEntity } from "../roles/entities/role.entity";
import { Tour } from "../tours/entities/tour.entity";
import { Review } from "../tours/entities/review.entity";

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  TOUR_AGENCY = 'TOUR_AGENCY',
  GUEST = 'GUEST',
}

@Entity({
  name: "users"
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.GUEST
  })
  role: Role;

  @OneToMany(() => RoleEntity, role => role.users)
  @JoinColumn()
  roles: RoleEntity[]

  @OneToOne(() => ProfileEntity, profile => profile.user, { cascade: ["insert"]})
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => Tour, tour => tour.createdBy)
  createdTours: Tour[];

  @ManyToMany(() => Tour, tour => tour.favoritedBy)
  favoriteTours: Tour[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @AfterInsert()
  afterCreate() {
    console.log(`User with email ${this.email} has been created.`);
  }
}
