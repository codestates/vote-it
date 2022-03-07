import { UserRepository } from '../users/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { Poll } from './entities/poll.entity';
import { PollsController } from './polls.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Poll, UserRepository])],
  providers: [PollsService],
  controllers: [PollsController],
  exports: [PollsService],
})
export class PollsModule {}
