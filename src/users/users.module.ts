import { UsersController } from './controllers/users.controller';
import { AuthModule } from './../auth/auth.module';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersMeController } from './controllers/users-me.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  controllers: [UsersMeController, UsersController],
  exports: [UsersService],
})
export class UsersModule {}
