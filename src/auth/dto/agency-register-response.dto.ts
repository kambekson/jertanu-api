import { Expose, Type } from 'class-transformer';
import { AgencyUserDto } from '../../users/dto/agency-user.dto';

export class AgencyRegisterResponseDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => AgencyUserDto)
  user: AgencyUserDto;

  @Expose()
  token: string;
} 