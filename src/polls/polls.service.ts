import { UserRepository } from '../users/repositories/user.repository';
import { Repository } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';

@Injectable()
export class PollsService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollRepository: Repository<Poll>,
    private readonly userRepository: UserRepository,
  ) {}

  async createPoll({ authorId, ...createPollDto }: CreatePollDto) {
    const author = await this.userRepository.findOneOrFail(authorId);
    const insertResult = await this.pollRepository.insert({
      author,
      ...createPollDto,
    });
    return { pollId: insertResult.raw.insertId as number };
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
