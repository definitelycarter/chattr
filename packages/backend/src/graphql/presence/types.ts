import { Presence } from '@chattr/types';

export type UserPresenceChangedNotification = {
  userPresenceChanged: {
    user_id: string;
    presence: Presence;
    member_ids: string[];
  };
};

export const USER_PRESENCE_CHANGED = 'USER_PRESENCE_CHANGED';
