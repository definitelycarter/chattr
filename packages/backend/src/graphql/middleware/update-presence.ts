import { updateUserPresence } from '../presence/helper';
import { GraphQLContext } from '../types';

type ResolverFn<T, TReturn> = (
  parent: unknown,
  args: T,
  context: GraphQLContext,
  info: unknown
) => TReturn;

export function updatePresence<T, TReturn>(next: ResolverFn<T, TReturn>) {
  return (root: any, args: T, context: GraphQLContext, info: any): TReturn => {
    updateUserPresence(context.viewer.id, 'online');
    return next(root, args, context, info);
  };
}
