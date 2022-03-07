import { User } from '../../users/entities/user.entity';
import { PickType } from '@nestjs/mapped-types';

export class LoginUserDto extends PickType(User, ['email', 'password']) {}
