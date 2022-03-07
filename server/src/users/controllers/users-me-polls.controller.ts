import { CreateUserPollDto } from '../dto/create-user-poll.dto';
import { JwtValidatePayload } from '../../auth/payloads/jwt-validate.payload';
import { PollsService } from '../../polls/polls.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  Controller,
  UseGuards,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UpdateUserPollDto } from '../dto/update-user-poll.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Controller('users/me/polls')
@UseGuards(JwtAuthGuard)
export class UsersMePollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Get()
  getMyPolls(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    return this.pollsService.getPollsOfUserPagination(
      userId,
      paginationQueryDto,
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createMyPoll(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Body() createUserPollDto: CreateUserPollDto,
  ) {
    return this.pollsService.createPoll({
      authorId: userId,
      ...createUserPollDto,
    });
  }

  @Patch(':pollId')
  updateMyPoll(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Param('pollId', ParseIntPipe) pollId: number,
    @Body() updateUserPollDto: UpdateUserPollDto,
  ) {
    return this.pollsService.updatePollOfAuthor(
      pollId,
      updateUserPollDto,
      userId,
    );
  }

  @Delete(':pollId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMyPoll(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Param('pollId', ParseIntPipe) pollId: number,
  ): Promise<void> {
    await this.pollsService.deletePollOfAuthor(pollId, userId);
  }
}
