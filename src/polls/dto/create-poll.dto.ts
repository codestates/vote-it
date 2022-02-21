import { Poll } from '../entities/poll.entity';
import { IntersectionType, PickType, PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive } from 'class-validator';

export class CreatePollDto extends IntersectionType(
  PickType(Poll, ['subject']),
  PartialType(PickType(Poll, ['expirationDate'])),
) {
  @IsNumber()
  @IsPositive()
  authorId: number;
}