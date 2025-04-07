import { Expose, Type, TypeHelpOptions } from "class-transformer";
import { UserProfileDto } from '../../profiles/dto/user-profile.dto';
import { AgencyProfilePublicDto } from '../../profiles/dto/agency-profile-public.dto';
import { Role } from '../user.entity';

export class UserPublicDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: Role;

  @Expose()
  @Type((options: TypeHelpOptions) => {
    const obj = options.object as { role: Role };
    if (obj.role === Role.TOUR_AGENCY) {
      return AgencyProfilePublicDto;
    }
    return UserProfileDto;
  })
  profile: UserProfileDto | AgencyProfilePublicDto;
}