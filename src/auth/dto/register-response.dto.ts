import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';

export class RegisterResponseDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  token: string;
} 