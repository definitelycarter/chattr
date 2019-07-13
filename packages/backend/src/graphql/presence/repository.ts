import { Presence } from '@chattr/types';
import redis from '../../redis';
import { notifyPresenceChanged } from './notifier';

export async function updateUserPresence(user_id: string, presence: Presence) {
  const pipeline = redis.multi();
  const key = keyFromId(user_id);
  pipeline.zrem('users:last_seen', user_id).del(key);

  if (presence !== 'offline') {
    pipeline.zadd('users:last_seen', String(Date.now()), String(user_id)).set(key, presence);
  }

  await pipeline.exec();
  return notifyPresenceChanged(user_id, presence);
}

export async function ensurePresence(user_id: string) {
  const key = keyFromId(user_id);

  const [, result]: [unknown, number][] = await redis
    .multi()
    .zadd('users:last_seen', String(Date.now()), String(user_id))
    // only set the user away if they do not have a status.
    .setnx(key, 'away')
    .exec();

  const [, inserted] = result;

  if (inserted > 0) {
    await notifyPresenceChanged(user_id, 'away');
  }
}

export async function getPresenceFromUsers(user_ids: string[]) {
  let pipeline = redis.multi();
  pipeline = user_ids.reduce((pipeline, id) => pipeline.get(keyFromId(id)), pipeline);

  const result: [unknown, string][] = await pipeline.exec();
  return result.map(([, presence]) => toPresence(presence));
}

const keyFromId = (id: string) => `users:${id}:presence`;

const toPresence = (value: string): Presence => {
  if (value === 'online' || value === 'away') {
    return value;
  }
  return 'offline';
};
