import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import express from 'express';
import path from 'path';
import schema, { GraphQLContext, RoomLoader, UserLoader, verify } from './graphql';
import oauth from './oauth/route';
import { ensurePresence, PresenceLoader } from './graphql/presence';

const app = express();

const graphql = new ApolloServer({
  schema,
  context: async ({ req, connection }: ContextOptions) => {
    let context: GraphQLContext | null = null;
    if (connection) {
      context = connection.context;
    } else if (req.headers.authorization) {
      const token = req.headers.authorization;
      const user = verify<GraphQLContext['viewer']>(token);
      if (user) {
        context = createContext(user);
      }
    }
    if (context) {
      await ensurePresence(context.viewer.id);
    }
    return context;
  },
  subscriptions: {
    onConnect: async (params: { [key: string]: any }): Promise<GraphQLContext> => {
      if (typeof params.token !== 'string') {
        throw new AuthenticationError('The "token" parameter is invalid.');
      }
      try {
        const viewer = verify<GraphQLContext['viewer']>(params.token);
        return createContext(viewer);
      } catch (e) {
        console.error(e);
        throw new AuthenticationError('Unable to validate token');
      }
    },
  },
});
graphql.applyMiddleware({ app, path: '/graphql' });

app.use('/oauth', oauth);
app.use(express.static(path.resolve(__dirname, '..', 'static')));
app.use('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'static', 'index.html'));
});

export { app, graphql };

type ContextOptions = {
  req: express.Request;
  connection: { context: GraphQLContext };
};

function createContext(viewer: GraphQLContext['viewer']): GraphQLContext {
  return {
    viewer,
    users: new UserLoader(),
    rooms: new RoomLoader(),
    presence: new PresenceLoader(),
  };
}
