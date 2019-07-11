import { makeExecutableSchema } from 'apollo-server-express';
import * as messages from './messages';
import * as mutations from './mutations';
import * as rooms from './rooms';
import * as presence from './presence';
import * as subscriptions from './subscriptions';
import * as users from './users';
import * as queries from './queries';

export { GraphQLContext } from './types';
export { UserLoader, verify } from './users';
export { RoomLoader } from './rooms';

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
