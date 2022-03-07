import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollOption } from './entities/poll-option.entity';
import { VoteHistory } from '../vote-histories/entities/vote-history.entity';
import { PollsOptionsController } from './polls-options-vote.controller';
import { PollsOptionsService } from './polls-options.service';

@Module({
  imports: [TypeOrmModule.forFeature([PollOption, VoteHistory])],
  providers: [PollsOptionsService],
  controllers: [PollsOptionsController],
})
export class PollsOptionsModule {}
