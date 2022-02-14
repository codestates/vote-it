import { User } from '../../users/entities/user.entity';

function pickData<T, K extends keyof T>(
  data: T,
  keys: ReadonlyArray<K>,
): Pick<T, K> {
  return keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: data[key],
    }),
    {},
  ) as Pick<T, K>;
}

export const pickUserData = (user: User) =>
  pickData(user, ['id', 'email', 'nickname', 'picture']);
