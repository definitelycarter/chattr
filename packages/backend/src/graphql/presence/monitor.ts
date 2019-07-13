import pubSub from '../pubsub';
import { updateUserPresence } from './repository';
import ms from 'ms';

let interval: NodeJS.Timer;
let expire_at = ms('1 minute');

async function checkPresence() {
  const redis = pubSub.getPublisher();

  const duration = Date.now() - expire_at;
  const user_ids: string[] = await redis.zrangebyscore('users:last_seen', 0, duration);

  if (!user_ids.length) return;

  const promises = user_ids.map(async id => {
    await updateUserPresence(id, 'offline');
  });
  return Promise.all(promises);
}

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
