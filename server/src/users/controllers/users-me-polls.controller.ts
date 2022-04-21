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
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { JwtValidatePayload } from '../../auth/payloads/jwt-validate.payload';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { OldPaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { PollsService } from '../../polls/polls.service';
import { CreateUserPollDto } from '../dto/create-user-poll.dto';
import { UpdateUserPollDto } from '../dto/update-user-poll.dto';

@Controller('users/me/polls')
@UseGuards(JwtAuthGuard)
export class UsersMePollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Get()
  getMyPolls(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Query() paginationQueryDto: OldPaginationQueryDto,
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
