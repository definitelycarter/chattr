import { createContext } from 'react';
import { Room } from './state';

type RoomContext = {
  rooms: Room[];
};

// @ts-ignore context will be initialized in RoomProvider.
export default createContext<RoomContext>(null);
