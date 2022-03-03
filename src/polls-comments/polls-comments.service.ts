import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PollComment } from './entities/poll-comment.entity';

@Injectable()
export class PollsCommentsService {
  constructor(
    @InjectRepository(PollComment)
    private readonly pollCommentRepository: Repository<PollComment>,
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
}
