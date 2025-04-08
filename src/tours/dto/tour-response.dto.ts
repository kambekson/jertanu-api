import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';
import { ItineraryItemDto } from './create-tour.dto';

export class TourResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  city: string;

  @Expose()
  price: number;

  @Expose()
  discountPercentage: number;

  @Expose()
  type: string;

  @Expose()
  status: string;

  @Expose()
  maxParticipants: number;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  services: string[];

  @Expose()
  @Type(() => ItineraryItemDto)
  itinerary: ItineraryItemDto[];

  @Expose()
  averageRating: number;

  @Expose()
  totalReviews: number;

  @Expose()
  @Type(() => UserDto)
  createdBy: UserDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  imageUrls: string[];
}