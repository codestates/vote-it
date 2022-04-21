import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtValidatePayload } from '../auth/payloads/jwt-validate.payload';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { OldPaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreatePollCommentDto } from './dto/create-poll-comment.dto';
import { UpdatePollCommentDto } from './dto/update-poll-comment.dto';
import { PollsCommentsService } from './polls-comments.service';

@Controller('polls/:pollId/comments')
export class PollsCommentsController {
  constructor(private readonly pollsCommentsService: PollsCommentsService) {}

  @Get()
  getSpecificRangeCommentsOfPoll(
    @Param('pollId', ParseIntPipe) pollId: number,
    @Query() paginationQueryDto: OldPaginationQueryDto,
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

  @Patch(':commentId')
  @UseGuards(JwtAuthGuard)
  updateCommentOfPoll(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Param('pollId', ParseIntPipe) pollId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() updatePollCommentDto: UpdatePollCommentDto,
  ) {
    return this.pollsCommentsService.updateCommentOfPoll(
      userId,
      pollId,
      commentId,
      updatePollCommentDto,
    );
  }

  @Delete(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async deleteCommentOfPoll(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Param('pollId', ParseIntPipe) pollId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<void> {
    await this.pollsCommentsService.deleteCommentOfPoll(
      userId,
      pollId,
      commentId,
    );
  }
}
