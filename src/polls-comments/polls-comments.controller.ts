import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PollsCommentsService } from './polls-comments.service';

@Controller('polls/:pollId/comments')
export class PollsCommentsController {
  constructor(private readonly pollsCommentsService: PollsCommentsService) {}

  @Get()
  getSpecificRangeCommentsOfPoll(
    @Param('pollId', ParseIntPipe) pollId: number,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    return this.pollsCommentsService.getSpecificRangeCommentsOfPoll(
      pollId,
      paginationQueryDto,
    );
  }
}
