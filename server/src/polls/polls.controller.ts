import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { JwtValidatePayload } from '../auth/payloads/jwt-validate.payload';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { GetPollsPaginationQueryDto } from './dto/get-polls-pagination-query.dto';
import { PollsService } from './polls.service';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Get()
  getSpecificRangePolls(
    @Query() getPollsPaginationQueryDto: GetPollsPaginationQueryDto,
  ) {
    return this.pollsService.getSpecificRangePolls(getPollsPaginationQueryDto);
  }

  @Get(':pollId')
  @UseGuards(OptionalJwtAuthGuard)
  getSpecificPoll(
    @Param('pollId', ParseIntPipe) pollId: number,
    @CurrentUser() user?: JwtValidatePayload,
  ) {
    return this.pollsService.getSpecificPoll(pollId, user?.userId);
  }
}
