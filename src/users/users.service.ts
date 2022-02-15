import { UserRepository } from './repositories/user.repository';
import { generateNickname } from '../common/utils/generate-nickname.util';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { pickUserData } from '../common/utils/pick-data.util';

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

  private async generateUniqueNickname(): Promise<string> {
    let nickname: string;
    do {
      nickname = generateNickname();
    } while (await this.userRepository.exists({ nickname }));
    return nickname;
  }
}
