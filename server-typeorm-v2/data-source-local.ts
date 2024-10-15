import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './src/entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'secret',
  database: 'recruitmentplatform',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ['src/migrations/*{.ts,.js}'],
  subscribers: [],
});