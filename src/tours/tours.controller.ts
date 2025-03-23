import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../roles/enums/role.enum';
import { UserEntity } from '../users/user.entity';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TOUR_AGENCY)
  create(@Body() createTourDto: CreateTourDto, @Req() req) {
    return this.toursService.create(createTourDto, req.user);
  }

  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TOUR_AGENCY)
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto, @Req() req) {
    return this.toursService.update(+id, updateTourDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TOUR_AGENCY)
  remove(@Param('id') id: string, @Req() req) {
    return this.toursService.remove(+id, req.user);
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  addReview(
    @Param('id') id: string,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req
  ) {
    return this.toursService.addReview(+id, createReviewDto, req.user);
  }

  @Post(':id/favorite')
  @UseGuards(JwtAuthGuard)
  addToFavorites(@Param('id') id: string, @Req() req) {
    return this.toursService.addToFavorites(+id, req.user);
  }

  @Delete(':id/favorite')
  @UseGuards(JwtAuthGuard)
  removeFromFavorites(@Param('id') id: string, @Req() req) {
    return this.toursService.removeFromFavorites(+id, req.user);
  }

  @Get('favorites/my')
  @UseGuards(JwtAuthGuard)
  getFavorites(@Req() req) {
    return this.toursService.getFavorites(req.user);
  }
} 