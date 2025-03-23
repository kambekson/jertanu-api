import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserProfileDto } from '../../profiles/dto/user-profile.dto';
import { Role } from '../user.entity';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  profile: UserProfileDto;

  @IsString()
  @IsOptional()
  role?: Role;
}
