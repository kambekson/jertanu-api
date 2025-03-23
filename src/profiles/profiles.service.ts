import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileEntity } from "./entities/profile.entity";
import { Repository } from "typeorm";
import { UserProfileDto } from './dto/user-profile.dto';
import { AgencyProfileDto } from './dto/agency-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity) private profileRepo: Repository<ProfileEntity>
  ) {}

  create(createProfileDto: UserProfileDto | AgencyProfileDto) {
    const profile = this.profileRepo.create(createProfileDto);
    return this.profileRepo.save(profile);
  }

  findAll() {
    return this.profileRepo.find();
  }

  findOne(id: number) {
    return this.profileRepo.findOne({
      where: { id }
    });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.profileRepo.update(id, updateProfileDto);
  }

  remove(id: number) {
    return this.profileRepo.delete(id);
  }
}
