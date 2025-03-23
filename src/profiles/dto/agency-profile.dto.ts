import { Expose, Transform } from 'class-transformer';

export class AgencyProfileDto {
  @Expose()
  @Transform(({ value }) => value || null)
  companyName: string;

  @Expose()
  @Transform(({ value }) => value || null)
  contactPerson: string;

  @Expose()
  @Transform(({ value }) => value || null)
  phoneNumber: string;

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
  logo?: string;
} 