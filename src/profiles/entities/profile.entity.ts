import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/user.entity";

@Entity({
  name: "profiles"
})
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  firstName: string;

  @Column({
    nullable: true
  })
  lastName: string;

  @Column({
    nullable: true
  })
  companyName: string;

  @Column({
    nullable: true
  })
  contactPerson: string;

  @Column({
    nullable: true
  })
  phoneNumber: string;

  @Column({
    nullable: true
  })
  agencyType: string;

  @Column({
    nullable: true
  })
  description: string;

  @Column({
    nullable: true
  })
  legalAddress: string;

  @Column({
    nullable: true
  })
  logo: string;

  @OneToOne(() => UserEntity, user => user.profile)
  user: UserEntity;
}
