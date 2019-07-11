import React from 'react';
import { Room } from './query';
import styles from './room.module.scss';

interface RoomItemProps {
  room: Room;
  onClick?: () => void;
}
export function RoomItem({ room, onClick }: RoomItemProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.name}>{room.name}</div>
      <div>15 users</div>
    </div>
  );
}
