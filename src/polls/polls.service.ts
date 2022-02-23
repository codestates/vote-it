import { UserRepository } from '../users/repositories/user.repository';
import { Connection, Repository } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { PollOption } from './entities/poll-option.entity';

@Injectable()
export class PollsService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollRepository: Repository<Poll>,
    private readonly userRepository: UserRepository,
    private readonly connection: Connection,
  ) {}

  async createPoll({
    authorId,
    options: pollOptions,
    ...createPollDto
  }: CreatePollDto) {
    const author = await this.userRepository.findOneOrFail(authorId);
    return this.connection.transaction(async (manager) => {
      const pollInsertResult = await manager.insert(Poll, {
        author,
        ...createPollDto,
      });
      const poll = pollInsertResult.generatedMaps[0] as Poll;
      await manager
        .createQueryBuilder(PollOption, 'poll_option')
        .insert()
        .values(
          pollOptions.map((pollOption) => ({ ...pollOption, poll: poll })),
        )
        .updateEntity(false)
        .execute();
      return { pollId: pollInsertResult.raw.insertId as Poll };
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
