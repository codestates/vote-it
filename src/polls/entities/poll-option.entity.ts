import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { Poll } from './poll.entity';

@Entity()
export class PollOption extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ManyToOne(() => Poll, (poll) => poll.options, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  poll: Poll;
}
