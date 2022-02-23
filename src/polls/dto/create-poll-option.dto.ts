import { PickType } from '@nestjs/mapped-types';
import { PollOption } from '../entities/poll-option.entity';

export class CreatePollOptionDto extends PickType(PollOption, ['content']) {}
