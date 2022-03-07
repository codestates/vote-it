import { User } from '../../users/entities/user.entity';
import { Poll } from '../../polls/entities/poll.entity';
import { PollOption } from '../../polls-options/entities/poll-option.entity';
import { VoteHistory } from '../../vote-histories/entities/vote-history.entity';
import { PollComment } from '../../polls-comments/entities/poll-comment.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import env from './env.config';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [User, Poll, PollOption, VoteHistory, PollComment],
};

if (env.NODE_ENV === 'development') {
  Object.assign<TypeOrmModuleOptions, TypeOrmModuleOptions>(typeOrmConfig, {
    synchronize: true,
    logging: true,
  });
}

export default typeOrmConfig;
