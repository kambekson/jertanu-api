import { Expose, Type, TypeHelpOptions } from "class-transformer";
import { UserProfileDto } from '../../profiles/dto/user-profile.dto';
import { AgencyProfileDto } from '../../profiles/dto/agency-profile.dto';
import { Role } from '../user.entity';
// import { ProfileEntity } from "../../profiles/entities/profile.entity";

export class UserDto {
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
      return AgencyProfileDto;
    }
    return UserProfileDto;
  })
  profile: UserProfileDto | AgencyProfileDto;

  // @Expose()
  // profile: ProfileEntity
}
