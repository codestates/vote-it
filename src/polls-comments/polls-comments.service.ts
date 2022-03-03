import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Poll } from '../polls/entities/poll.entity';
import { CreatePollCommentDto } from './dto/create-poll-comment.dto';
import { PollComment } from './entities/poll-comment.entity';

@Injectable()
export class PollsCommentsService {
  constructor(
    @InjectRepository(PollComment)
    private readonly pollCommentRepository: Repository<PollComment>,
    @InjectRepository(Poll)
    private readonly pollRepository: Repository<Poll>,
  ) {}

  async getSpecificRangeCommentsOfPoll(
    pollId: number,
    { offset, limit }: PaginationQueryDto,
  ) {
    const [comments, count] = await this.pollCommentRepository
      .createQueryBuilder('comment')
      .select([
        'comment.id',
        'comment.content',
        'comment.createdAt',
        'author.id',
        'author.nickname',
      ])
      .leftJoin('comment.author', 'author')
      .where('comment.pollId = :pollId', { pollId })
      .andWhere('comment.parentId IS NULL')
      .orderBy('comment.createdAt', 'DESC')
      .addOrderBy('comment.id', 'DESC')
      .offset(offset)
      .limit(limit)
      .getManyAndCount();
    await Promise.all(
      comments.map(async (comment) => {
        comment.children = await this.pollCommentRepository
          .createQueryBuilder('children')
          .select([
            'children.id',
            'children.content',
            'children.createdAt',
            'author.id',
            'author.nickname',
          ])
          .leftJoin('children.author', 'author')
          .where('children.parentId = :parentId', { parentId: comment.id })
          .getMany();
      }),
    );
    return { comments, count };
  }

  async createCommentOfPoll(
    authorId: number,
    pollId: number,
    createPollCommentDto: CreatePollCommentDto,
  ) {
    const _existsPoll = await this.pollRepository
      .createQueryBuilder()
      .where('id = :pollId', { pollId })
      .getOneOrFail();

    const insertResult = await this.pollCommentRepository
      .createQueryBuilder()
      .insert()
      .values({ authorId, pollId, ...createPollCommentDto })
      .returning('id')
      .execute();
    const insertedPollId = insertResult.raw[0].id as number;
    return { id: insertedPollId };
  }

  async deleteCommentOfPoll(
    authorId: number,
    pollId: number,
    commentId: number,
  ): Promise<void> {
    const deleteResult = await this.pollCommentRepository
      .createQueryBuilder()
      .delete()
      .where('id = :commentId', { commentId })
      .andWhere('pollId = :pollId', { pollId })
      .andWhere('authorId = :authorId', { authorId })
      .execute();
    if (deleteResult.affected === 0) {
      throw new EntityNotFoundError(PollComment, commentId);
    }
  }
}
