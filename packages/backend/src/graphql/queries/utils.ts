import { QueryListArguments } from '@chattr/types';
import { ValidationError } from 'apollo-server-core';
import { PAGINATION_LIMIT } from '.';

export async function validateQueryOptions<T>(options: QueryListArguments<T>) {
  if (options.take < 0 || options.take > PAGINATION_LIMIT) {
    throw new ValidationError(`You must take a range between 0 and ${PAGINATION_LIMIT} items.`);
  }
  return options;
}

export function makeQueryResponse<T>([nodes, count]: [T[], number]): {
  count: number;
  nodes: T[];
} {
  return {
    count,
    nodes,
  };
}
