import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const exceptionStatus = exception.getStatus();
    const error = exception.getResponse();
    const body = this.getBody(error);

    host
      .switchToHttp()
      .getResponse<Response>()
      .status(exceptionStatus)
      .json(body);
  }

  private getBody(error: string | { message: string } | object) {
    if (typeof error === 'string') {
      return { message: error };
    }
    if ('message' in error) {
      return { message: error.message };
    }
    return error;
  }
}
