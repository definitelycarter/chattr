import { Presence } from '@chattr/types';
import pubSub from '../pubsub';
import { notifyPresenceChanged } from './notifier';

export async function updateUserPresence(user_id: string, presence: Presence) {
  const redis = pubSub.getPublisher();
  const pipeline = redis.multi();
  pipeline.zrem('users:last_seen', user_id).del(`users:${user_id}:presence`);

  if (presence !== 'offline') {
    pipeline
      .zadd('users:last_seen', String(Date.now()), String(user_id))
      .set(`users:${user_id}:presence`, presence);
  }

  await pipeline.exec();
  return notifyPresenceChanged(user_id, presence);
}

export async function ensurePresence(user_id: string) {
  const redis = pubSub.getPublisher();

  const [, result]: [unknown, number][] = await redis
    .multi()
    .zadd('users:last_seen', String(Date.now()), String(user_id))
    // only set the user away if they do not have a status.
    .setnx(`users:${user_id}:presence`, 'away')
    .exec();

  const [, inserted] = result;

  if (inserted > 0) {
    await notifyPresenceChanged(user_id, 'away');
  }
}
