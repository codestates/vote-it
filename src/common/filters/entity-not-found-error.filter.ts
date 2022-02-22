import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundErrorFilter
  implements ExceptionFilter<EntityNotFoundError>
{
  private static readonly errorMessages: Record<string, string> = {
    User: '존재하지 않는 유저입니다.',
    Poll: '존재하지 않는 투표입니다.',
  };

  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const errorEntity = exception.message.split('"')[1];
    const errorMessage = EntityNotFoundErrorFilter.errorMessages[errorEntity];
    response.status(HttpStatus.NOT_FOUND).json({ message: errorMessage });
  }
}
