import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [MinioController],
  providers: [
    {
      provide: MinioService,
      useFactory: (configService: ConfigService) => {
        const config = {
          endPoint: configService.get('MINIO_ENDPOINT'),
          port: parseInt(configService.get('MINIO_PORT')),
          useSSL: configService.get('MINIO_USE_SSL') === 'true',
          accessKey: configService.get('MINIO_ACCESS_KEY'),
          secretKey: configService.get('MINIO_SECRET_KEY'),
        };
        return new MinioService(config);
      },
      inject: [ConfigService],
    },
  ],
  exports: [MinioService],
})
export class MinioModule {} 