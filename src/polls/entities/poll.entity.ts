import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { User } from '../../users/entities/user.entity';
import { CreatePollOptionDto } from '../../polls-options/dto/create-poll-option.dto';
import { PollOption } from '../../polls-options/entities/poll-option.entity';
import { PollComment } from '../../polls-comments/entities/poll-comment.entity';
@Entity()
export class Poll extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  @IsBoolean()
  isPrivate: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  @IsBoolean()
  isPlural: boolean;

  @Column({ type: 'timestamp', nullable: true })
  @IsDateString()
  expirationDate: Date | null;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  picture: string | null;

  @ManyToOne(() => User, (user) => user.polls, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  author: User;

  @Column()
  authorId: number;

  @OneToMany(() => PollOption, (pollOption) => pollOption.poll)
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(20)
  @Type(() => CreatePollOptionDto)
  @ValidateNested()
  @ArrayUnique((option: CreatePollOptionDto) => option.content)
  options: PollOption[];

  @OneToMany(() => PollComment, (comment) => comment.poll)
  comments: PollComment[];
}
