import { UsersService } from './../users.service';
import { JwtValidatePayload } from '../../auth/payloads/jwt-validate.payload';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';

@Controller('users/me')
@UseGuards(JwtAuthGuard)
export class UsersMeController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getMyData(@User() { userId }: JwtValidatePayload) {
    return this.usersService.getUserById(userId);
  }
}
