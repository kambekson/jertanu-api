import { Expose } from 'class-transformer';

export class UserProfileDto {
  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  phoneNumber?: string;
} 