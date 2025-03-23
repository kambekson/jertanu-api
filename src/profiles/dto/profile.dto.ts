import { Expose } from 'class-transformer';

export class ProfileDto {
  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  phone?: string;

  @Expose()
  companyName?: string;

  @Expose()
  contactPerson?: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  agencyType?: string;

  @Expose()
  description?: string;

  @Expose()
  legalAddress?: string;

  @Expose()
  logo?: string;
}