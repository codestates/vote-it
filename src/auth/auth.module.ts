import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from '../users/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import env from '../common/config/env.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    UsersModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
