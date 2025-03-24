import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { scrypt as _scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { Buffer } from 'buffer';
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../users/user.entity";
import { SignInDto } from "./dto/sign-in.dto";
import { CreateTourAgencyDto } from '../users/dto/create-tour-agency.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../users/user.entity';
import { ProfilesService } from '../profiles/profiles.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private profilesService: ProfilesService,
  ) {}

  async signUp({ email, password, profile }: CreateUserDto) {
    const user = await this.userService.findOneByEmail(email);
    if (user) throw new BadRequestException(`User ${user.email} in use`);

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;

    return this.userService.create({ 
      email, 
      password: result, 
      profile,
      role: Role.USER 
    })
  }

  async validateUser({ email, password }: SignInDto) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new BadRequestException('Invalid email');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const { password: userPassword, ...result } = user;
    return result;
  }

  async registerUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException(`User with email ${createUserDto.email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const { password, role, ...userData } = createUserDto;
    
    const profile = await this.profilesService.create({
      firstName: userData.profile.firstName,
      lastName: userData.profile.lastName,
      phoneNumber: userData.profile.phoneNumber
    });

    const user = await this.userService.create({
      email: userData.email,
      password: hashedPassword,
      role: Role.USER,
      profile: profile
    });

    const { password: _, ...userWithoutPassword } = user;
    const tokens = await this.signIn(user);

    return {
      message: "Регистрация прошла успешно.",
      user: userWithoutPassword,
      token: tokens.access_token
    };
  }

  async registerAgency(createAgencyDto: CreateTourAgencyDto) {
    const existingUser = await this.userService.findOneByEmail(createAgencyDto.email);
    if (existingUser) {
      throw new BadRequestException(`User with email ${createAgencyDto.email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(createAgencyDto.password, 10);
    const { password, role, ...agencyData } = createAgencyDto;
    
    const user = await this.userService.create({
      email: agencyData.email,
      password: hashedPassword,
      role: Role.TOUR_AGENCY,
      profile: agencyData.profile
    });

    const { password: _, ...userWithoutPassword } = user;
    const tokens = await this.signIn(user);

    return {
      message: "Регистрация прошла успешно.",
      user: userWithoutPassword,
      token: tokens.access_token
    };
  }

  async signIn(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' })
    };
  }

  async refreshToken(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' })
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException();
    return {...user, role: user.role };
  }
}
