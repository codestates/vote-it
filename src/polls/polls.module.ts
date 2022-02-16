import { UserRepository } from './../users/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { Poll } from './entities/poll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poll, UserRepository])],
  providers: [PollsService],
  exports: [PollsService],
})
export class PollsModule {}
