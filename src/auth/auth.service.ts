import { pickUserData } from '../common/utils/pick-data.util';
import { JwtPayload } from './payloads/jwt.payload';
import { UserRepository } from '../users/repositories/user.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  signUp(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findOne({ email });
    if (user === undefined || user.password !== password) {
      throw new ForbiddenException('이메일 또는 비밀번호가 다릅니다.');
    }

    const payload: JwtPayload = { sub: user.id, email };
    return {
      accessToken: this.jwtService.sign(payload),
      user: pickUserData(user),
    };
  }
}
