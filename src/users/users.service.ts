import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateTourAgencyDto } from "./dto/create-tour-agency.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ProfilesService } from "../profiles/profiles.service";
import { Role } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private profilesService: ProfilesService
  ) {}

  async create(credentials: CreateUserDto | CreateTourAgencyDto): Promise<UserEntity> {
    const profile = await this.profilesService.create(credentials.profile);
    const user = this.userRepo.create({
      ...credentials,
      profile
    });
    return this.userRepo.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  findById(id: number) {
    return this.userRepo.findOne({
      where: { id }
    });
  }

  findOneByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async update(id: number, credentials: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException(`User with ID = ${id} not found`);
    Object.assign(user, credentials);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException(`User with ID = ${id} not found`);
    return this.userRepo.remove(user);
  }
}
