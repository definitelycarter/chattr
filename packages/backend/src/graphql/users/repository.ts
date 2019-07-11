// import { QueryListArguments } from '@chattr/types';
import { getRepository } from '../../utils/typeorm';
import User from './model';
import { QueryListArguments } from '@chattr/types';

export function findUsers({ skip, take, filter = {} }: QueryListArguments<{ username?: string }>) {
  let builder = getRepository(User).createQueryBuilder();

  if (filter.username) {
    builder = builder.where('LOWER(username) LIKE LOWER(:username)', {
      username: `%${filter.username}%`,
    });
  }

  return builder.skip(skip).take(take);
}

export function getUserById(id: string) {
  return getRepository(User)
    .createQueryBuilder()
    .where({ id })
    .getOne();
}

export function getUsersByIds(ids: string[]) {
  return getRepository(User)
    .createQueryBuilder()
    .whereInIds(ids)
    .getMany();
}
