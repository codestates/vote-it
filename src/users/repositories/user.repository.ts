import { User } from '../entities/user.entity';
import { EntityRepository, FindConditions, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async exists(conditions: FindConditions<User>): Promise<boolean> {
    const user = await this.findOne(conditions);
    return user !== undefined;
  }
}
