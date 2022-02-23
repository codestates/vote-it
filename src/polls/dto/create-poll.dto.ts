import { Poll } from '../entities/poll.entity';
import { IntersectionType, PickType, PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive } from 'class-validator';

export class CreatePollDto extends IntersectionType(
  PickType(Poll, ['subject', 'isPrivate', 'isPlural', 'options']),
  PartialType(PickType(Poll, ['expirationDate'])),
) {
  @IsNumber()
  @IsPositive()
  authorId: number;
}
