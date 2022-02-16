import { Poll } from '../../polls/entities/poll.entity';
import { User } from '../../users/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import env from './env.config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [User, Poll],
  synchronize: true,
  logging: true,
};
