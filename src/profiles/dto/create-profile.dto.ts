import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsDate } from "class-validator";

export class CreateProfileDto {
  @Expose()
  @IsOptional()
  @IsString()
  firstName?: string;

  @Expose()
  @IsOptional()
  @IsString()
  lastName?: string;

  @Expose()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @Expose()
  @IsOptional()
  @IsString()
  companyName?: string;

  @Expose()
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @Expose()
  @IsOptional()
  @IsString()
  agencyType?: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsOptional()
  @IsString()
  legalAddress?: string;

  @Expose()
  @IsOptional()
  @IsString()
  logo?: string;

  @Expose()
  @IsOptional()
  @IsDate()
  birthday?: Date;
}
