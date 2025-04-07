import { Expose, Transform } from 'class-transformer';

export class AgencyProfilePublicDto {
  @Expose()
  @Transform(({ value }) => value || null)
  companyName: string;

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
  logo?: string;
}