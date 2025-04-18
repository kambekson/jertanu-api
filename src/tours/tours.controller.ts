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
    
    try {
      // Проверяем, содержит ли запрос данные в формате form-data или JSON
      if (typeof createTourDto === 'string' || createTourDto.data) {
        // Если данные пришли в формате form-data
        const tourDataString = typeof createTourDto === 'string' ? createTourDto : createTourDto.data;
        
        // Предварительная обработка JSON строки для исправления распространенных ошибок
        const cleanedJsonString = tourDataString
          .replace(/,\s*}/g, '}')  // Удаление запятых перед закрывающей фигурной скобкой
          .replace(/,\s*\]/g, ']'); // Удаление запятых перед закрывающей квадратной скобкой
          
        tourData = JSON.parse(cleanedJsonString);
        
        // Проверяем и корректно обрабатываем поле itinerary
        if (tourData.itinerary && Array.isArray(tourData.itinerary)) {
          // Преобразуем строковые значения в объекты, если это необходимо
          tourData.itinerary = tourData.itinerary.map(item => {
            if (typeof item === 'string') {
              try {
                return JSON.parse(item);
              } catch (e) {
                return item;
              }
            }
            return item;
          });
        }
      } else {
        // Если данные пришли в формате JSON
        tourData = createTourDto;
      }
    } catch (error) {
      throw new Error(`Invalid JSON format: ${error.message}. Please check your input data.`);
    }
    
    console.log('Tour data to save:', JSON.stringify(tourData, null, 2));
    
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
    
    // Перезагружаем тур для получения всех данных
    const savedTour = await this.toursService.findOne(tour.id);
    return savedTour;
  }

  @Get()
  @Public()
  @Serialize(TourPublicResponseDto)
  findAll() {
    return this.toursService.findAll();
  }

  @Get('agency/my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TOUR_AGENCY)
  @Serialize(TourPublicResponseDto)
  findMyTours(@Req() req) {
    return this.toursService.findByAgency(req.user.id);
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
  @UseInterceptors(FilesInterceptor('images'))
  @Serialize(TourResponseDto)
  async update(
    @Param('id') id: string,
    @Body() updateTourDto: any,
    @UploadedFiles() images: Express.Multer.File[],
    @Req() req
  ) {
    let tourData: UpdateTourDto;
    
    try {
      // Проверяем, содержит ли запрос данные в формате form-data или JSON
      if (typeof updateTourDto === 'string' || updateTourDto.data) {
        // Если данные пришли в формате form-data
        const tourDataString = typeof updateTourDto === 'string' ? updateTourDto : updateTourDto.data;
        
        // Предварительная обработка JSON строки для исправления распространенных ошибок
        const cleanedJsonString = tourDataString
          .replace(/,\s*}/g, '}')  // Удаление запятых перед закрывающей фигурной скобкой
          .replace(/,\s*\]/g, ']'); // Удаление запятых перед закрывающей квадратной скобкой
          
        tourData = JSON.parse(cleanedJsonString);
      } else {
        // Если данные пришли в формате JSON
        tourData = updateTourDto;
      }
    } catch (error) {
      throw new Error(`Invalid JSON format: ${error.message}. Please check your input data.`);
    }

    // Обновляем тур
    const tour = await this.toursService.update(+id, tourData, req.user);
    
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
    
    // Перезагружаем тур для получения всех данных
    const updatedTour = await this.toursService.findOne(tour.id);
    return updatedTour;
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