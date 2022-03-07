import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { Poll } from '../../polls/entities/poll.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class PollComment extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  content: string;

  @Column({ nullable: true })
  @IsInt()
  @IsPositive()
  @IsOptional()
  parentId: number;

  @ManyToOne(() => PollComment, (comment) => comment.children, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  parent: PollComment;

  @OneToMany(() => PollComment, (comment) => comment.parent)
  children: PollComment[];

  @Column()
  pollId: number;

  @ManyToOne(() => Poll, (poll) => poll.comments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  poll: Poll;

  @Column()
  authorId: number;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  author: User;
}
