import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { PollOption } from '../../polls-options/entities/poll-option.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class VoteHistory {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  pollOptionId: number;

  @ManyToOne(() => User, (user) => user.voteHistories, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => PollOption, (pollOption) => pollOption.voteHistories, {
    onDelete: 'CASCADE',
  })
  pollOption: PollOption;
}
