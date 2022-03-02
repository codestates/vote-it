import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { UsersService } from '../users.service';
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
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '../../common/config/multer.config';

@Controller('users/me')
@UseGuards(JwtAuthGuard)
export class UsersMeController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getMyData(@CurrentUser() { userId }: JwtValidatePayload) {
    return this.usersService.getUserById(userId);
  }

  @Patch()
  updateMyProfile(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.usersService.updateUserProfileById(
      userId,
      updateUserProfileDto,
    );
  }

  @Patch('picture')
  @UseInterceptors(FileInterceptor('picture', multerConfig('user')))
  async updateMyPicture(
    @CurrentUser() { userId }: JwtValidatePayload,
    @UploadedFile() picture: Express.Multer.File,
  ) {
    return this.usersService.updateUserPictureById(userId, picture.filename);
  }

  @Patch('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateMyPassword(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<void> {
    await this.usersService.updateUserPasswordById(
      userId,
      updateUserPasswordDto,
    );
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMe(@CurrentUser() { userId }: JwtValidatePayload): Promise<void> {
    await this.usersService.deleteUserById(userId);
  }
}
