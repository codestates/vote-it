import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtValidatePayload } from '../auth/payloads/jwt-validate.payload';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PollsOptionsService } from './polls-options.service';

@Controller('polls/:pollId/options/:pollOptionId/vote')
@UseGuards(JwtAuthGuard)
export class PollsOptionsController {
  constructor(private readonly pollsOptionsService: PollsOptionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async vote(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Param('pollId', ParseIntPipe) pollId: number,
    @Param('pollOptionId', ParseIntPipe) pollOptionId: number,
  ) {
    return this.pollsOptionsService.vote(userId, pollId, pollOptionId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancelVote(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Param('pollId', ParseIntPipe) pollId: number,
    @Param('pollOptionId', ParseIntPipe) pollOptionId: number,
  ): Promise<void> {
    await this.pollsOptionsService.cancelVote(userId, pollId, pollOptionId);
  }
}
