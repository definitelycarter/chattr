import { useContext } from 'react';
import Context from './context';
import { Room } from './state';

export function useRooms() {
  const { rooms } = useContext(Context);
  return rooms;
}

export function useRoom(room_id: string) {
  const rooms = useRooms();
  return rooms.find((room: Room) => room.id === room_id);
}
