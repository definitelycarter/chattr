import { makeExecutableSchema } from 'apollo-server-express';
import * as messages from './messages';
import * as mutations from './mutations';
import * as presence from './presence';
import * as queries from './queries';
import * as rooms from './rooms';
import * as subscriptions from './subscriptions';
import * as users from './users';

export { ensurePresence, PresenceLoader } from './presence';
export { RoomLoader } from './rooms';
export { GraphQLContext } from './types';
export { UserLoader, verify } from './users';

export default makeExecutableSchema({
  typeDefs: [
    messages.typeDef,
    mutations.typeDef,
    presence.typeDef,
    queries.typeDef,
    rooms.typeDef,
    subscriptions.typeDef,
    users.typeDef,
  ],
  resolvers: [
    messages.resolver,
    presence.resolver,
    queries.resolver,
    rooms.resolver,
    users.resolver,
  ],
});
