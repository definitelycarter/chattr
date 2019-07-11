import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import express from 'express';
import path from 'path';
import schema, { GraphQLContext, RoomLoader, UserLoader, verify } from './graphql';
import oauth from './oauth/route';
import { ensurePresence, PresenceLoader } from './graphql/presence';

const app = express();

type ContextOptions = {
  req: express.Request;
  connection: { context: GraphQLContext };
};

const graphql = new ApolloServer({
  schema,
  context: async ({ req, connection }: ContextOptions) => {
    let context: GraphQLContext | null = null;
    if (connection) {
      context = connection.context;
    } else if (req) {
      const token = req.headers.authorization;
      if (token) {
        const user = verify<GraphQLContext['viewer']>(token);
        if (user) {
          context = {
            viewer: user,
            users: new UserLoader(),
            rooms: new RoomLoader(),
            presence: new PresenceLoader(),
          };
        }
      }
    }

    if (context) {
      await ensurePresence(context.viewer.id);
    }

    return context;
  },
  subscriptions: {
    onConnect: async (params: any) => {
      if (!params.token) {
        throw new AuthenticationError('Token parameter is not present');
      }
      try {
        const viewer = verify<GraphQLContext['viewer']>(params.token);
        const context: GraphQLContext = {
          viewer,
          users: new UserLoader(),
          rooms: new RoomLoader(),
          presence: new PresenceLoader(),
        };
        return context;
      } catch {
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
