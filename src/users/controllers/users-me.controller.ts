import { UpdateUserPasswordDto } from './../dto/update-user-password.dto';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { UsersService } from './../users.service';
import { JwtValidatePayload } from '../../auth/payloads/jwt-validate.payload';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  UseGuards,
  HttpStatus,
  NotImplementedException,
} from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';

@Controller('users/me')
@UseGuards(JwtAuthGuard)
export class UsersMeController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getMyData(@User() { userId }: JwtValidatePayload) {
    return this.usersService.getUserById(userId);
  }

  @Patch()
  updateMyProfile(
    @User() { userId }: JwtValidatePayload,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.usersService.updateUserProfileById(
      userId,
      updateUserProfileDto,
    );
  }

  @Patch('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateMyPassword(
    @User() { userId }: JwtValidatePayload,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    await this.usersService.updateUserPasswordById(
      userId,
      updateUserPasswordDto,
    );
  }

  @Patch('picture')
  async updateMyPicture(@User() {}: JwtValidatePayload) {
    throw new NotImplementedException();
  }
}
