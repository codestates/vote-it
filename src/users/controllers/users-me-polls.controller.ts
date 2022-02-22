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
} from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';

@Controller('users/me/polls')
@UseGuards(JwtAuthGuard)
export class UsersMePollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createMyPoll(
    @User() { userId }: JwtValidatePayload,
    @Body() createUserPollDto: CreateUserPollDto,
  ) {
    return this.pollsService.createPoll({
      authorId: userId,
      ...createUserPollDto,
    });
  }

  @Delete(':pollId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMyPoll(
    @User() { userId }: JwtValidatePayload,
    @Param('pollId', ParseIntPipe) pollId: number,
  ): Promise<void> {
    await this.pollsService.deletePollOfAuthor(pollId, userId);
  }
}
