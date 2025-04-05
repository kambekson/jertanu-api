import { Expose, Transform } from 'class-transformer';

export class AgencyProfileDto {
  @Expose()
  @Transform(({ value }) => value || null)
  companyName: string;

  @Expose()
  @Transform(({ value }) => value || null)
  officialCompanyName: string;

  @Expose()
  @Transform(({ value }) => value || null)
  bin: string;

  @Expose()
  @Transform(({ value }) => value || null)
  registrationDate: Date;

  @Expose()
  @Transform(({ value }) => value || null)
  directorFullName: string;

  @Expose()
  @Transform(({ value }) => value || null)
  city: string;

  @Expose()
  @Transform(({ value }) => value || null)
  contactPerson: string;

  @Expose()
  @Transform(({ value }) => value || null)
  phoneNumber: string;

  @Expose()
  @Transform(({ value }) => value || null)
  contactEmail: string;

  @Expose()
  @Transform(({ value }) => value || null)
  agencyType?: string;

  @Expose()
  @Transform(({ value }) => value || null)
  description?: string;

  @Expose()
  @Transform(({ value }) => value || null)
  legalAddress: string;

  @Expose()
  @Transform(({ value }) => value || null)
  bankAccount: string;

  @Expose()
  @Transform(({ value }) => value || null)
  bankBic: string;

  @Expose()
  @Transform(({ value }) => value || null)
  bankName: string;

  @Expose()
  @Transform(({ value }) => value || null)
  logo?: string;
} 