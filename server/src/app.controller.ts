import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import multerConfig from './common/config/multer.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(): Promise<string> {
    return this.appService.index();
  }

  /*
   * TODO
   * # 파일 업로드 관련해서 구조 리팩터링과 로직 수정 필요
   * - NODE_ENV가 production인지 아닌지에 따라서 S3업로드와 서버 내 업로드 분리
   * - 적절한 API 경로 배치
   */
  @Post('upload-poll-picture')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('picture', multerConfig('poll')))
  uploadPollPicture(@UploadedFile() picture: Express.Multer.File) {
    return {
      uploadId: `${picture.filename}`,
    };
  }
}
