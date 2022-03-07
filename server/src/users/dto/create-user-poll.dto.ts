import { OmitType } from '@nestjs/mapped-types';
import { CreatePollDto } from '../../polls/dto/create-poll.dto';

export class CreateUserPollDto extends OmitType(CreatePollDto, ['authorId']) {}
