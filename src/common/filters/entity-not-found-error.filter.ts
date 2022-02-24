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
  private static readonly koreanEntitiesName: Record<string, string> = {
    User: '유저',
    Poll: '투표',
  };

  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const errorEntity = exception.message.split('"')[1];
    const koreanEntityName =
      EntityNotFoundErrorFilter.koreanEntitiesName[errorEntity];

    host
      .switchToHttp()
      .getResponse<Response>()
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `존재하지 않는 ${koreanEntityName}입니다.` });
  }
}
