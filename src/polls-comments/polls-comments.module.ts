import { Module } from '@nestjs/common';
import { PollsCommentsService } from './polls-comments.service';
import { PollsCommentsController } from './polls-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollComment } from './entities/poll-comment.entity';
import { Poll } from '../polls/entities/poll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PollComment, Poll])],
  providers: [PollsCommentsService],
  controllers: [PollsCommentsController],
})
export class PollsCommentsModule {}
