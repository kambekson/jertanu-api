import { DataSource } from "typeorm";
import { config } from "dotenv";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "./src/users/user.entity";
import { RoleEntity } from "./src/roles/entities/role.entity";
import { ProfileEntity } from "./src/profiles/entities/profile.entity";

config({
  path: `.env.development`,
});

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [UserEntity, RoleEntity, ProfileEntity],
  migrations: ['migrations/**']
})
