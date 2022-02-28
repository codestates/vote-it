import { UserRepository } from '../users/repositories/user.repository';
import { Connection, Repository } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { PollOption } from '../polls-options/entities/poll-option.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class PollsService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollRepository: Repository<Poll>,
    private readonly userRepository: UserRepository,
    private readonly connection: Connection,
  ) {}

  async getSpecificRangePolls({ offset, limit }: PaginationQueryDto) {
    const [polls, count] = await this.pollRepository
      .createQueryBuilder('poll')
      .select([
        'poll.id',
        'poll.createdAt',
        'poll.expirationDate',
        'poll.subject',
        'author.nickname',
      ])
      .leftJoin('poll.author', 'author')
      .where('poll.isPrivate = false')
      .offset(offset)
      .limit(limit)
      .getManyAndCount();
    return { polls, count };
  }

  async getSpecificPoll(pollId: number) {
    const poll = await this.pollRepository
      .createQueryBuilder('poll')
      .select([
        'poll.id',
        'poll.createdAt',
        'poll.expirationDate',
        'poll.subject',
        'author.id',
        'author.nickname',
        'author.picture',
        'options.id',
        'options.content',
      ])
      .leftJoin('poll.author', 'author')
      .leftJoin('poll.options', 'options')
      .where('poll.id = :pollId', { pollId })
      .getOneOrFail();
    return poll;
  }

  async createPoll({ authorId, options, ...createPollDto }: CreatePollDto) {
    const author = await this.userRepository.findOneOrFail(authorId);
    return this.connection.transaction(async (manager) => {
      const pollInsertResult = await manager
        .createQueryBuilder()
        .insert()
        .into(Poll)
        .values({ author, ...createPollDto })
        .returning('id')
        .execute();
      const pollId = pollInsertResult.raw[0].id as number;
      const optionsInsertResult = await manager
        .createQueryBuilder()
        .insert()
        .into(PollOption)
        .values(
          options.map((option) => ({
            ...option,
            poll: { id: pollId },
          })),
        )
        .returning('id')
        .execute();
      const optionIds = (optionsInsertResult.raw as { id: number }[]).map(
        (option) => option.id,
      );
      return {
        pollId,
        optionIds,
      };
    });
  }

  async deletePollOfAuthor(pollId: number, authorId: number): Promise<void> {
    const poll = await this.pollRepository
      .createQueryBuilder('poll')
      .select([`poll.id`, 'author.id'])
      .leftJoin('poll.author', 'author')
      .where('poll.id = :pollId', { pollId })
      .andWhere(`author.id = :authorId`, { authorId })
      .getOneOrFail();
    if (poll.author.id !== authorId) {
      throw new ForbiddenException('자신의 투표가 아닙니다.');
    }
    this.pollRepository.delete(pollId);
  }
}
