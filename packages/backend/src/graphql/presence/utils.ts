import { Presence } from '@chattr/types';

export const keyFromId = (id: number) => `users:${id}:presence`;

export const toPresence = (value: string): Presence => {
  if (value === 'online' || value === 'away') {
    return value;
  }
  return 'offline';
};
