import { requireAuth } from '../auth';
import pubSub from '../pubsub';
import { GraphQLContext } from '../types';
import { updateUserPresence } from './repository';
import { UserPresenceChangedNotification, USER_PRESENCE_CHANGED } from './types';

async function updatePresence(
  _: unknown,
  { presence }: { presence: 'online' | 'away' },
  context: GraphQLContext
) {
  await updateUserPresence(context.viewer.id, presence);
  return true;
}

async function* userPresenceChanged(_: unknown, args: unknown, context: GraphQLContext) {
  // @ts-ignore
  const iter = pubSub.asyncIterator<UserPresenceChangedNotification>(
    USER_PRESENCE_CHANGED
  ) as AsyncIterable<UserPresenceChangedNotification>;
  for await (const { userPresenceChanged } of iter) {
    if (userPresenceChanged.member_ids.includes(context.viewer.id)) {
      context.users.clearAll();
      context.rooms.clearAll();
      yield {
        userPresenceChanged: {
          user_id: userPresenceChanged.user_id,
          presence: userPresenceChanged.presence,
        },
      };
    }
  }

  yield null;
}

function ping(_: unknown, args: unknown, context: GraphQLContext) {
  // This this method is a noop. We use this mutation as a way for clients
  // to update their last_seen.  last_seen is set through the context handler.
}

export default {
  Mutation: {
    updatePresence: requireAuth(updatePresence),
    ping: requireAuth(ping),
  },
  Subscription: {
    userPresenceChanged: {
      subscribe: userPresenceChanged,
    },
  },
};
