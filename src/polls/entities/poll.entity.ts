import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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
