import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { User } from '../../users/entities/user.entity';

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

  @ManyToOne(() => User, (user) => user.polls, { nullable: false })
  author: User;
}
