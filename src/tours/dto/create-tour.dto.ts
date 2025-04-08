import { IsString, IsNumber, IsEnum, IsDate, Min, Max, IsOptional, IsBoolean, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { TourType, TourStatus } from '../entities/tour.entity';

export class ItineraryItemDto {
  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;
}

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
  @IsOptional()
  discountPrice?: number;

  @IsEnum(TourType)
  type: TourType;

  @IsEnum(TourStatus)
  status: TourStatus;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxParticipants?: number;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  services?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItineraryItemDto)
  @IsOptional()
  itinerary?: ItineraryItemDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}