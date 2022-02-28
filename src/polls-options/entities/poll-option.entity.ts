import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { Poll } from '../../polls/entities/poll.entity';
import { VoteHistory } from '../../vote-histories/entities/vote-history.entity';

@Entity()
export class PollOption extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ManyToOne(() => Poll, (poll) => poll.options, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  poll: Poll;

  @OneToMany(() => VoteHistory, (voteHistory) => voteHistory.pollOption)
  voteHistories: VoteHistory[];
}
