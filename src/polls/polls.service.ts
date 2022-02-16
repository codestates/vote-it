import { UserRepository } from '../users/repositories/user.repository';
import { Repository } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { Injectable } from '@nestjs/common';
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
}
