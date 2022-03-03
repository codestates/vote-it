import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from '../../common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Poll } from '../../polls/entities/poll.entity';
import { VoteHistory } from '../../vote-histories/entities/vote-history.entity';

@Entity()
export class User extends CommonEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @OneToMany(() => Poll, (poll) => poll.author)
  polls: Poll[];

  @OneToMany(() => VoteHistory, (voteHistory) => voteHistory.user)
  voteHistories: VoteHistory[];
}
