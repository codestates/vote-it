import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  signUp(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
