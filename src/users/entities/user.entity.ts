import { Poll } from '../../polls/entities/poll.entity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from '../../common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  picture: string | null;

  @OneToMany(() => Poll, (poll) => poll.author)
  polls: Poll[];
}
