import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../roles/enums/role.enum';
import { UserEntity } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { TourResponseDto } from './dto/tour-response.dto';
import { TourPublicResponseDto } from './dto/tour-public-response.dto';
import { Public } from '../interceptors/public.interceptor';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MinioService } from '../minio/minio.service';

@Controller('tours')
export class ToursController {
  constructor(
    private readonly toursService: ToursService,
    private readonly minioService: MinioService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TOUR_AGENCY)
  @UseInterceptors(FilesInterceptor('images'))
  @Serialize(TourResponseDto)
  async create(
    @Body() createTourDto: any,
    @UploadedFiles() images: Express.Multer.File[],
    @Req() req
  ) {
    let tourData: CreateTourDto;
    
    // Проверяем, содержит ли запрос данные в формате form-data или JSON
    if (typeof createTourDto === 'string' || createTourDto.data) {
      // Если данные пришли в формате form-data
      const tourDataString = typeof createTourDto === 'string' ? createTourDto : createTourDto.data;
      tourData = JSON.parse(tourDataString);
    } else {
      // Если данные пришли в формате JSON
      tourData = createTourDto;
    }
    
    // Создаем тур
    const tour = await this.toursService.create(tourData, req.user);
    
    // Загружаем изображения, если они есть
    if (images && images.length > 0) {
      const imageUrls = [];
      for (const image of images) {
        const imageUrl = await this.minioService.uploadTourImage(image, tour.id);
        imageUrls.push(imageUrl);
      }
      
      // Обновляем тур с URL-адресами изображений
      await this.toursService.update(tour.id, { images: imageUrls }, req.user);
    }
    
    return tour;
  }

  @Get()
  @Public()
  @Serialize(TourPublicResponseDto)
  findAll() {
    return this.toursService.findAll();
  }

  @Get(':id')
  @Public()
  @Serialize(TourPublicResponseDto)
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TOUR_AGENCY)
  @Serialize(TourResponseDto)
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto, @Req() req) {
    return this.toursService.update(+id, updateTourDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TOUR_AGENCY)
  @Serialize(TourResponseDto)
  remove(@Param('id') id: string, @Req() req) {
    return this.toursService.remove(+id, req.user);
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @Serialize(TourPublicResponseDto)
  addReview(
    @Param('id') id: string,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req
  ) {
    return this.toursService.addReview(+id, createReviewDto, req.user);
  }

  @Post(':id/favorite')
  @UseGuards(JwtAuthGuard)
  @Serialize(TourPublicResponseDto)
  addToFavorites(@Param('id') id: string, @Req() req) {
    return this.toursService.addToFavorites(+id, req.user);
  }

  @Delete(':id/favorite')
  @UseGuards(JwtAuthGuard)
  @Serialize(TourPublicResponseDto)
  removeFromFavorites(@Param('id') id: string, @Req() req) {
    return this.toursService.removeFromFavorites(+id, req.user);
  }

  @Get('favorites/my')
  @UseGuards(JwtAuthGuard)
  @Serialize(TourPublicResponseDto)
  getFavorites(@Req() req) {
    return this.toursService.getFavorites(req.user);
  }
}