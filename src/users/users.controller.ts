import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./user.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUser } from "../auth/get-user.decorator";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dto/user.dto";

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  async getProfile(@GetUser() user: UserEntity) {
    const userId = user.id;
    return this.usersService.findById(userId);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  async updateMe(@GetUser() user: UserEntity, @Body() body: UpdateUserDto): Promise<UserEntity> {
    const userId = user.id;
    return this.usersService.update(userId, body);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findById(+id)
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
