import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';

interface MinioConfig {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
}

@Injectable()
export class MinioService extends Client implements OnModuleInit {
  private readonly agencyLogosBucket = 'agency-logos';
  private readonly tourImagesBucket = 'tour-images';

  constructor(config: MinioConfig) {
    super(config);
  }

  async onModuleInit() {
    // Проверяем и создаем бакет для логотипов агентств
    const agencyLogosExists = await this.bucketExists(this.agencyLogosBucket);
    if (!agencyLogosExists) {
      await this.makeBucket(this.agencyLogosBucket);
      // Установим политику доступа для публичного чтения
      await this.setBucketPolicy(this.agencyLogosBucket, JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'PublicRead',
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${this.agencyLogosBucket}/*`],
          },
        ],
      }));
    }
    
    // Проверяем и создаем бакет для изображений туров
    const tourImagesExists = await this.bucketExists(this.tourImagesBucket);
    if (!tourImagesExists) {
      await this.makeBucket(this.tourImagesBucket);
      // Установим политику доступа для публичного чтения
      await this.setBucketPolicy(this.tourImagesBucket, JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'PublicRead',
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${this.tourImagesBucket}/*`],
          },
        ],
      }));
    }
  }

  async uploadFile(file: Express.Multer.File, agencyId: number): Promise<string> {
    const fileName = `${agencyId}-${Date.now()}-${file.originalname}`;
    await this.putObject(
      this.agencyLogosBucket,
      fileName,
      file.buffer,
      file.size,
      { 'Content-Type': file.mimetype }
    );
    return `${process.env.MINIO_PUBLIC_URL}/${this.agencyLogosBucket}/${fileName}`;
  }
  
  async uploadTourImage(file: Express.Multer.File, tourId: number): Promise<string> {
    const fileName = `${tourId}-${Date.now()}-${file.originalname}`;
    await this.putObject(
      this.tourImagesBucket,
      fileName,
      file.buffer,
      file.size,
      { 'Content-Type': file.mimetype }
    );
    return `${process.env.MINIO_PUBLIC_URL}/${this.tourImagesBucket}/${fileName}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const urlParts = fileUrl.split('/');
    const bucketName = urlParts[urlParts.length - 2]; // Получаем имя бакета из URL
    const fileName = urlParts[urlParts.length - 1]; // Получаем имя файла из URL
    
    if (fileName && (bucketName === this.agencyLogosBucket || bucketName === this.tourImagesBucket)) {
      await this.removeObject(bucketName, fileName);
    }
  }
}