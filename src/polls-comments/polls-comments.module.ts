import { Module } from '@nestjs/common';
import { PollsCommentsService } from './polls-comments.service';
import { PollsCommentsController } from './polls-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollComment } from './entities/poll-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PollComment])],
  providers: [PollsCommentsService],
  controllers: [PollsCommentsController],
})
export class PollsCommentsModule {}
