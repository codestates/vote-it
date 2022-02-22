import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserRepository } from './repositories/user.repository';
import { generateNickname } from '../common/utils/generate-nickname.util';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { pickUserData } from '../common/utils/pick-data.util';
import { EntityNotFoundError } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser({ email, password, nickname }: CreateUserDto) {
    if (await this.userRepository.exists({ email })) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }
    if (nickname === undefined) {
      nickname = await this.generateUniqueNickname();
    } else if (await this.userRepository.exists({ nickname })) {
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    }

    const insertResult = await this.userRepository.insert({
      email,
      nickname,
      password,
    });
    return { userId: insertResult.raw.insertId as number };
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId);
    return pickUserData(user);
  }

  async updateUserProfileById(
    userId: number,
    updateUserProfileDto: UpdateUserProfileDto,
  ) {
    const updateResult = await this.userRepository.update(
      userId,
      updateUserProfileDto,
    );
    if (updateResult.affected === 0) {
      throw new EntityNotFoundError(User, userId);
    }
    return updateUserProfileDto;
  }

  async updateUserPasswordById(
    userId: number,
    { currentPassword, newPassword }: UpdateUserPasswordDto,
  ) {
    const user = await this.userRepository.findOneOrFail(userId, {
      select: ['password'],
    });
    if (user.password !== currentPassword) {
      throw new ForbiddenException('currentPassword가 유효하지 않습니다.');
    }
    this.userRepository.update(userId, { password: newPassword });
  }

  async deleteUserById(userId: number) {
    const deleteResult = await this.userRepository.delete(userId);
    if (deleteResult.affected === 0) {
      throw new EntityNotFoundError(User, userId);
    }
  }

  private async generateUniqueNickname(): Promise<string> {
    let nickname: string;
    do {
      nickname = generateNickname();
    } while (await this.userRepository.exists({ nickname }));
    return nickname;
  }
}
