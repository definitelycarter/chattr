import dayjs from 'dayjs';
import React, { useRef, useEffect } from 'react';
import styles from './message-list.module.scss';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ROOM, RoomQuery } from './query';

interface MessageListProps {
  roomId: string;
}
export function MessageList(props: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery<RoomQuery, { id: string }>(QUERY_ROOM, {
    variables: {
      id: props.roomId,
    },
  });

  useEffect(() => {
    const div = containerRef.current;
    div!.scrollTop = div!.scrollHeight;
  }, []);

  if (!data) return null;

  return (
    <div className={styles.container} ref={containerRef}>
      {data.room &&
        data.room.messages.map(message => (
          <div key={message.id} className={styles.message}>
            <div className={styles.author}>
              <div className={styles.member}>{message.author.username}</div>
              <div className={styles.sent}>{dayjs(message.sent_at).format('h:mm:ss a')}</div>
            </div>
            <div className={styles.content}>{message.content}</div>
          </div>
        ))}
    </div>
  );
}
