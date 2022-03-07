import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { PollComment } from '../entities/poll-comment.entity';

export class CreatePollCommentDto extends IntersectionType(
  PickType(PollComment, ['content']),
  PartialType(PickType(PollComment, ['parentId'])),
) {}
