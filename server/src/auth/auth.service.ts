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
    const { password: encryptedPassword, ...user } = await this.userRepository
      .createQueryBuilder('user')
      .select()
      .where('user.email = :email', { email })
      .getOneOrFail();

    if (encryptedPassword !== password) {
      throw new ForbiddenException('잘못된 비밀번호입니다.');
    }

    const payload: JwtPayload = { sub: user.id, email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user };
  }
}
