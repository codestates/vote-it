import { User } from '../entities/user.entity';
import { PartialType, PickType } from '@nestjs/mapped-types';

export class UpdateUserProfileDto extends PartialType(
  PickType(User, ['nickname']),
) {}
