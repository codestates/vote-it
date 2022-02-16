import { NotFoundErrorMessages } from './../not-found-error-messages';
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
    User: NotFoundErrorMessages.USER,
  };

  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const errorEntity = exception.message.split('"')[1];
    const errorMessage = EntityNotFoundErrorFilter.errorMessages[errorEntity];
    response.status(HttpStatus.NOT_FOUND).json({ message: errorMessage });
  }
}
