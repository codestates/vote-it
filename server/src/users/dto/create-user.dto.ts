import { User } from '../entities/user.entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';

export class CreateUserDto extends IntersectionType(
  PickType(User, ['email', 'password']),
  PartialType(PickType(User, ['nickname'])),
) {}
