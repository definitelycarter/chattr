import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { Room as RoomQuery } from './query';

interface RoomProps {
  room: RoomQuery;
}
export function Room(props: RoomProps) {
  return (
    <div>
      {props.room.messages.map(message => (
        <div key={message.id} style={{ marginBottom: 10 }}>
          <div>{message.author.username}</div>
          <div>{message.content}</div>
          <div>{dayjs(message.sent_at).format('h:mm:ss a')}</div>
        </div>
      ))}
    </div>
  );
}
