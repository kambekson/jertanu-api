import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';

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
  startDate: Date;

  @Expose()
  endDate: Date;

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