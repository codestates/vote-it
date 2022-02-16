import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserRepository } from './repositories/user.repository';
import { generateNickname } from '../common/utils/generate-nickname.util';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { pickUserData } from '../common/utils/pick-data.util';
import { NotFoundErrorMessages } from 'src/common/not-found-error-messages';

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

    const newUser = await this.userRepository.save({
      email,
      password,
      nickname,
    });
    return pickUserData(newUser);
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
      throw new NotFoundException(NotFoundErrorMessages.USER);
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

  private async generateUniqueNickname(): Promise<string> {
    let nickname: string;
    do {
      nickname = generateNickname();
    } while (await this.userRepository.exists({ nickname }));
    return nickname;
  }
}
