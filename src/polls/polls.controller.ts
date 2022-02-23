import { Controller, Get, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PollsService } from './polls.service';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Get()
  getSpecificRangePolls(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.pollsService.getSpecificRangePolls(paginationQueryDto);
  }
}
