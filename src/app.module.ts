import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PollsModule } from './polls/polls.module';
import { PollsOptionsModule } from './polls-options/polls-options.module';
import { PollsCommentsModule } from './polls-comments/polls-comments.module';
import typeOrmConfig from './common/config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    PollsModule,
    PollsOptionsModule,
    PollsCommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
