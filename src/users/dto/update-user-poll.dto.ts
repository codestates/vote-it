import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserPollDto } from './create-user-poll.dto';

export class UpdateUserPollDto extends PartialType(
  PickType(CreateUserPollDto, ['expirationDate', 'isPrivate']),
) {}
