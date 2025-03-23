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
  private readonly bucketName = 'agency-logos';

  constructor(config: MinioConfig) {
    super(config);
  }

  async onModuleInit() {
    const exists = await this.bucketExists(this.bucketName);
    if (!exists) {
      await this.makeBucket(this.bucketName);
      // Установим политику доступа для публичного чтения
      await this.setBucketPolicy(this.bucketName, JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'PublicRead',
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${this.bucketName}/*`],
          },
        ],
      }));
    }
  }

  async uploadFile(file: Express.Multer.File, agencyId: number): Promise<string> {
    const fileName = `${agencyId}-${Date.now()}-${file.originalname}`;
    await this.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
      { 'Content-Type': file.mimetype }
    );
    return `${process.env.MINIO_PUBLIC_URL}/${this.bucketName}/${fileName}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const fileName = fileUrl.split('/').pop();
    if (fileName) {
      await this.removeObject(this.bucketName, fileName);
    }
  }
} 