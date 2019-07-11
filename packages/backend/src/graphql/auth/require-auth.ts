import { AuthenticationError } from 'apollo-server-core';
import { GraphQLContext } from '../types';

type ResolverFn<T> = (root: unknown, args: T, context: GraphQLContext, info: unknown) => unknown;

export const requireAuth = <T>(next: ResolverFn<T>) => (
  root: unknown,
  args: T,
  context: GraphQLContext,
  info: unknown
) => {
  const user = context.viewer;

  if (!user) {
    throw new AuthenticationError('Unauthorized');
  }

  return next(root, args, context, info);
};
