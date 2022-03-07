import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PollOption } from './entities/poll-option.entity';
import { VoteHistory } from '../vote-histories/entities/vote-history.entity';

@Injectable()
export class PollsOptionsService {
  constructor(
    @InjectRepository(PollOption)
    private readonly pollOptionRespotiroy: Repository<PollOption>,
    @InjectRepository(VoteHistory)
    private readonly voteHistoryRepository: Repository<VoteHistory>,
  ) {}

  async vote(userId: number, pollId: number, pollOptionId: number) {
    const _isOptionOfPoll = await this.pollOptionRespotiroy
      .createQueryBuilder('pollOption')
      .select(['pollOption.id'])
      .where('pollOption.id = :pollOptionId', { pollOptionId })
      .andWhere('pollOption.pollId = :pollId', { pollId })
      .getOneOrFail();

    const voteHistory = await this.voteHistoryRepository
      .createQueryBuilder('voteHistory')
      .where('voteHistory.userId = :userId', { userId })
      .andWhere('voteHistory.pollOptionId = :pollOptionId', { pollOptionId })
      .getOne();
    if (
      voteHistory !== undefined &&
      voteHistory.pollOptionId === pollOptionId
    ) {
      throw new ConflictException('이미 이 옵션에 투표했습니다.');
    }
    this.voteHistoryRepository
      .createQueryBuilder('voteHistory')
      .insert()
      .values({ userId, pollOptionId })
      .execute();
  }

  async cancelVote(userId: number, pollId: number, pollOptionId: number) {
    const _isOptionOfPoll = await this.pollOptionRespotiroy
      .createQueryBuilder('pollOption')
      .select(['pollOption.id'])
      .where('pollOption.id = :pollOptionId', { pollOptionId })
      .andWhere('pollOption.pollId = :pollId', { pollId })
      .getOneOrFail();

    this.voteHistoryRepository
      .createQueryBuilder()
      .delete()
      .where('userId = :userId', { userId })
      .andWhere('pollOptionId = :pollOptionId', { pollOptionId })
      .execute();
  }
}
