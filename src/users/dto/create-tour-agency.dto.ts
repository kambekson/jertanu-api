import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { AgencyProfileDto } from '../../profiles/dto/agency-profile.dto';
import { Role } from '../user.entity';

export class CreateTourAgencyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  profile: AgencyProfileDto;

  @IsString()
  @IsOptional()
  role?: Role;
} 