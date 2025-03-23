import { Expose, Type } from 'class-transformer';
import { AgencyProfileDto } from '../../profiles/dto/agency-profile.dto';

export class AgencyUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  @Type(() => AgencyProfileDto)
  profile: AgencyProfileDto;
}