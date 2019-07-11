import { createServer } from 'http';
import { graphql, app } from './app';
import { getConnectionOptions, createConnection } from 'typeorm';
import * as presence from './graphql/presence/monitor';

const server = createServer(app);
graphql.installSubscriptionHandlers(server);

type Callback = (g: typeof graphql) => void;

export async function listen(port: string | undefined, cb: Callback) {
  const options = await getConnectionOptions(process.env.NODE_ENV);
  await createConnection(options);
  server.listen(port, () => cb(graphql));
  presence.start();
}

export function close() {
  presence.stop();
  server.close();
}
