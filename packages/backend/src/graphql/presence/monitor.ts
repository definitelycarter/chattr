// import { GraphQLContext } from 'graphql/types';
import pubSub from '../pubsub';
import { updateUserPresence } from './helper';

let interval: NodeJS.Timer;
let expire_at = 1000 * 60;

// let clients: { [id: number]: GraphQLContext } = {};
// export function add(client: GraphQLContext) {
//   clients[client.id!] = client;
// }

// export function remove(id: number) {
//   delete clients[id];
// }

async function checkPresence() {
  const redis = pubSub.getPublisher();

  const duration = Date.now() - expire_at;
  const user_ids: string[] = await redis.zrangebyscore('users:last_seen', 0, duration);

  if (!user_ids.length) return;

  const promises = user_ids.map(async id => {
    await updateUserPresence(id, 'offline');
    // killUser(user_id);
  });
  return Promise.all(promises);
}

// export async function killUser(user_id: number) {
//   Object.values(clients).forEach(({ id, viewer, socket }) => {
//     if (viewer.id === user_id) {
//       remove(id!);
//       socket!.close();
//     }
//   });
// }

/**
 * starts an interval that checks for inactive / dead clients. inactive is
 * assumed if the user hasn't updated their status within 1 minute.
 */
export async function start() {
  await checkPresence();
  interval = setInterval(checkPresence, 2000);
}

export function stop() {
  clearInterval(interval);
}
