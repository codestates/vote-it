import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtValidatePayload } from '../auth/payloads/jwt-validate.payload';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreatePollCommentDto } from './dto/create-poll-comment.dto';
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  createCommentOfPoll(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Param('pollId', ParseIntPipe) pollId: number,
    @Body() createPollCommentDto: CreatePollCommentDto,
  ) {
    return this.pollsCommentsService.createCommentOfPoll(
      userId,
      pollId,
      createPollCommentDto,
    );
  }
}
