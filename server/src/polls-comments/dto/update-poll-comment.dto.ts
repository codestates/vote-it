import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePollCommentDto } from './create-poll-comment.dto';

export class UpdatePollCommentDto extends PartialType(
  PickType(CreatePollCommentDto, ['content']),
) {}
