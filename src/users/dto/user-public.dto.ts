import { Expose, Type } from 'class-transformer';
import { AgencyProfilePublicDto } from '../../profiles/dto/agency-profile-public.dto';

export class UserPublicDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  @Type(() => AgencyProfilePublicDto)
  profile: AgencyProfilePublicDto;
}