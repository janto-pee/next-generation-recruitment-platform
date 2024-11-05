import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from 'config';
import { User } from './src/entity/User.entity';
import { Auth } from './src/entity/Auth.entity';
import { Address } from './src/entity/Address.entity';
import { Applicant } from './src/entity/Applicants.entity';
import { Employer } from './src/entity/Employer.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: config.get<number>('dbPort'),
  username: config.get<string>('dbUsername'),
  password: config.get<string>('dbPassword'),
  database: config.get<string>('database'),
  synchronize: true,
  logging: false,
  entities: [
    User,
    Auth,
    Address,
    Applicant,
    Employer,
    // Application,
    // FineGrainedSalary,
    // Interview,
    // Job,
    // Location,
    // Message,
    // Metadata,
    // Notification,
    // Probation,
    // Rating,
    // Salary,
    // Session,
    // TaskGrained,
  ],
  migrations: ['src/migrations/*{.ts,.js}'],
  subscribers: [],
});
