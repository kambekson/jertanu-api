import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { CreateTourAgencyDto } from "../users/dto/create-tour-agency.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { GetUser } from "./get-user.decorator";
import { UserEntity } from "../users/user.entity";
import { Public } from "../interceptors/public.interceptor";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "../users/dto/user.dto";
import { RefreshJwtAuthGuard } from "./guards/refresh-jwt-auth.guard";
import { RegisterResponseDto } from "./dto/register-response.dto";
import { AgencyRegisterResponseDto } from "./dto/agency-register-response.dto";

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@GetUser() user: UserEntity) {
    return this.authService.signIn(user);
  }

  @Public()
  @Serialize(RegisterResponseDto)
  @Post('register/user')
  registerUser(@Body() body: CreateUserDto) {
    return this.authService.registerUser(body);
  }

  @Public()
  @Serialize(AgencyRegisterResponseDto)
  @Post('register/agency')
  registerAgency(@Body() body: CreateTourAgencyDto) {
    return this.authService.registerAgency(body);
  }

  @Public()
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  refresh(@GetUser() user: UserEntity) {
    return this.authService.refreshToken(user)
  }
}
