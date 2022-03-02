import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OptionalJwtAuthGuard } from '../../auth/guards/optional-jwt-auth.guard';
import { JwtValidatePayload } from '../../auth/payloads/jwt-validate.payload';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Controller('polls/:pollId/comments')
export class PollsCommentsController {
  constructor() {
    // TODO
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  getSpecificRangeCommentsOfPoll(
    @Param('pollId', ParseIntPipe) pollId: number,
    @Query() paginationQueryDto: PaginationQueryDto,
    @CurrentUser() user?: JwtValidatePayload,
  ) {
    console.log(pollId);
    console.log(paginationQueryDto);
    console.log(user);
  }
}
