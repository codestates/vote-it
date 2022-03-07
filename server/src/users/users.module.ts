import { PollsModule } from '../polls/polls.module';
import { UsersMePollsController } from './controllers/users-me-polls.controller';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersMeController } from './controllers/users-me.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), PollsModule],
  providers: [UsersService],
  controllers: [UsersMeController, UsersMePollsController, UsersController],
  exports: [UsersService],
})
export class UsersModule {}
