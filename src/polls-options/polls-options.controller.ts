import {
  Controller,
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

@Controller('polls/:pollId/options/:pollOptionId')
@UseGuards(JwtAuthGuard)
export class PollsOptionsController {
  constructor(private readonly pollsOptionsService: PollsOptionsService) {}

  @Post('vote')
  @HttpCode(HttpStatus.CREATED)
  async vote(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Param('pollId', ParseIntPipe) pollId: number,
    @Param('pollOptionId', ParseIntPipe) pollOptionId: number,
  ) {
    return this.pollsOptionsService.vote(userId, pollId, pollOptionId);
  }
}
