import { IsString, IsNumber, IsEnum, IsDate, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { TourType, TourStatus } from '../entities/tour.entity';

export class CreateTourDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  city: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discountPercentage?: number;

  @IsEnum(TourType)
  type: TourType;

  @IsEnum(TourStatus)
  status: TourStatus;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;
} 