import * as path from 'path';
import * as server from './server';
const port = process.env.PORT;

process.env.APP_ROOT_PATH = path.resolve(__dirname, '..');

server.listen(port, ({ graphqlPath, subscriptionsPath }) => {
  console.log(`🚀  Server ready at http://localhost:${port}${graphqlPath}`);
  console.log(`🚀  Server ready at ws://localhost:${port}${subscriptionsPath}`);
});

process.on('SIGHUP', () => server.close());
process.on('SIGABRT', () => server.close());
