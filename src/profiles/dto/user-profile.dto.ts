import { Expose } from 'class-transformer';

export class UserProfileDto {
  @Expose()
  fullName?: string;

  @Expose()
  phone?: string;
} 