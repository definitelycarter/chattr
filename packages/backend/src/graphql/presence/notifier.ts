import { Presence } from '@chattr/types';
import pubSub from '../pubsub';
import { USER_PRESENCE_CHANGED } from './types';
import { getMembersInUserRoom } from '../rooms/repository';

export async function notifyPresenceChanged(user_id: string, presence: Presence) {
  const member_ids = await getMembersInUserRoom(user_id);
  pubSub.publish(USER_PRESENCE_CHANGED, {
    userPresenceChanged: {
      user_id,
      presence,
      member_ids,
    },
  });
}
