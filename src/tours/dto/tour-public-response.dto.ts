import { Expose, Type, Transform } from 'class-transformer';
import { UserPublicDto } from '../../users/dto/user-public.dto';
import { AgencyProfilePublicDto } from '../../profiles/dto/agency-profile-public.dto';
import { Role } from '../../roles/enums/role.enum';
import { ItineraryItemDto } from './create-tour.dto';

export class TourPublicResponseDto {
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
  @Type(() => UserPublicDto)
  createdBy: UserPublicDto;
  
  @Expose()
  @Transform(({ obj }) => {
    if (obj.createdBy?.role === Role.TOUR_AGENCY && obj.createdBy?.profile) {
      return obj.createdBy.profile.companyName;
    }
    return null;
  })
  agencyName: string;
  
  @Expose()
  @Transform(({ obj }) => {
    if (obj.createdBy?.role === Role.TOUR_AGENCY && obj.createdBy?.profile) {
      return obj.createdBy.profile.logo;
    }
    return null;
  })
  agencyLogo: string;
  
  @Expose()
  @Transform(({ obj }) => {
    if (obj.createdBy?.role === Role.TOUR_AGENCY && obj.createdBy?.profile) {
      return obj.createdBy.profile.city;
    }
    return null;
  })
  agencyCity: string;
  
  @Expose()
  @Transform(({ obj }) => {
    if (obj.createdBy?.role === Role.TOUR_AGENCY && obj.createdBy?.profile) {
      return obj.createdBy.profile.description;
    }
    return null;
  })
  agencyDescription: string;
  
  @Expose()
  @Transform(({ obj }) => {
    if (obj.createdBy?.role === Role.TOUR_AGENCY && obj.createdBy?.profile) {
      return obj.createdBy.profile.contactEmail;
    }
    return null;
  })
  agencyContactEmail: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  imageUrls: string[];
}