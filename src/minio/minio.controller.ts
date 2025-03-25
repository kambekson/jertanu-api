import { Controller, Post, UseInterceptors, UploadedFile, Param, Delete, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../roles/enums/role.enum';

@Controller('files')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload/agency/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TOUR_AGENCY)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAgencyLogo(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') agencyId: string,
  ) {
    return this.minioService.uploadFile(file, parseInt(agencyId));
  }

  @Delete('agency/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TOUR_AGENCY)
  async deleteAgencyLogo(@Param('id') agencyId: string) {
    // Здесь нужно получить URL файла из профиля агентства
    // и передать его в метод deleteFile
    return this.minioService.deleteFile(agencyId);
  }
} 