import { Expose } from 'class-transformer';

export class ProfileDto {
  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  companyName?: string;

  @Expose()
  officialCompanyName?: string;

  @Expose()
  bin?: string;

  @Expose()
  registrationDate?: Date;

  @Expose()
  directorFullName?: string;

  @Expose()
  city?: string;

  @Expose()
  contactPerson?: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  contactEmail?: string;


  @Expose()
  description?: string;

  @Expose()
  legalAddress?: string;

  @Expose()
  actualAddress?: string;

  @Expose()
  bankAccount?: string;

  @Expose()
  bankBic?: string;

  @Expose()
  bankName?: string;

  @Expose()
  logo?: string;
}