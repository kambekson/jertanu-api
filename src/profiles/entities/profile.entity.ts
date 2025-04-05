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
  officialCompanyName: string;

  @Column({
    nullable: true
  })
  bin: string;

  @Column({
    nullable: true,
    type: 'date'
  })
  registrationDate: Date;

  @Column({
    nullable: true
  })
  directorFullName: string;

  @Column({
    nullable: true
  })
  city: string;

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
  contactEmail: string;

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
  bankAccount: string;

  @Column({
    nullable: true
  })
  bankBic: string;

  @Column({
    nullable: true
  })
  bankName: string;

  @Column({
    nullable: true
  })
  logo: string;

  @Column({
    nullable: true,
    type: 'date'
  })
  birthday: Date;

  @OneToOne(() => UserEntity, user => user.profile)
  user: UserEntity;
}
