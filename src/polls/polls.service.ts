import { UserRepository } from '../users/repositories/user.repository';
import { Connection, EntityNotFoundError, Repository } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { PollOption } from '../polls-options/entities/poll-option.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { UpdateUserPollDto } from '../users/dto/update-user-poll.dto';
import { joinPollPictureUrl } from '../common/config/join-picture-url.config';

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
        'poll.picture',
        'author.nickname',
      ])
      .leftJoin('poll.author', 'author')
      .where('poll.isPrivate = false')
      .offset(offset)
      .limit(limit)
      .orderBy('poll.createdAt', 'DESC')
      .getManyAndCount();
    return {
      polls: polls.map((poll) => ({
        ...poll,
        picture: joinPollPictureUrl(poll.picture),
      })),
      count,
    };
  }

  // TODO 정리 필요...
  async getSpecificPoll(pollId: number, userId?: number) {
    const rawPolls = await this.pollRepository
      .createQueryBuilder('poll')
      .select([
        'poll.id',
        'poll.createdAt',
        'poll.isPlural',
        'poll.expirationDate',
        'poll.subject',
        'poll.picture',
        'author.id',
        'author.nickname',
        'options.id',
        'options.content',
      ])
      .addSelect('IF(voteHistories.userId IS NULL, false, true)', 'isVoted')
      .leftJoin('poll.author', 'author')
      .leftJoin('poll.options', 'options')
      .leftJoin(
        'options.voteHistories',
        'voteHistories',
        'voteHistories.userId = :userId',
        { userId },
      )
      .where('poll.id = :pollId', { pollId })
      .getRawMany();
    if (rawPolls.length === 0) {
      throw new EntityNotFoundError(Poll, pollId);
    }
    const poll = {
      id: rawPolls[0].poll_id,
      createdAt: rawPolls[0].poll_createdAt,
      subject: rawPolls[0].poll_subject,
      isPlural: rawPolls[0].poll_isPlural,
      expirationDate: rawPolls[0].poll_expirationDate,
      picture: joinPollPictureUrl(rawPolls[0].poll_picture),
      author: {
        id: rawPolls[0].author_id,
        nickname: rawPolls[0].author_nickname,
      },
      options: rawPolls.map((rawPoll) => ({
        id: rawPoll.options_id,
        content: rawPoll.options_content,
      })),
      isVoted: rawPolls.some((rawPoll) => rawPoll.isVoted),
    };
    if (poll.isVoted) {
      const optionsVotedCount = await this.pollRepository
        .createQueryBuilder('poll')
        .select('options.id', 'optionId')
        .addSelect('COUNT(voteHistories.userId)', 'votedCount')
        .leftJoin('poll.options', 'options')
        .leftJoin('options.voteHistories', 'voteHistories')
        .where('poll.id = :pollId', { pollId })
        .groupBy('options.id')
        .getRawMany();
      poll.options = poll.options.map((option, i) => ({
        ...option,
        isVoted: rawPolls[i].isVoted === 1,
        votedCount: parseInt(optionsVotedCount[i].votedCount, 10),
      }));
    }
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

  async updatePollOfAuthor(
    pollId: number,
    updateUserPollDto: UpdateUserPollDto,
    authorId: number,
  ) {
    const updateResult = await this.pollRepository
      .createQueryBuilder('poll')
      .update()
      .set(updateUserPollDto)
      .where('poll.id = :pollId', { pollId })
      .andWhere('poll.authorId = :authorId', { authorId })
      .execute();
    if (updateResult.affected === 0) {
      throw new EntityNotFoundError(Poll, pollId);
    }
    return updateUserPollDto;
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
