import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Composer } from './composer';
import { MemberList } from './member-list';
import { MessageList } from './message-list';
import { PostRoomMessageResult, POST_ROOM_MESSAGE } from './mutation';
import { useRoomQuery } from './query';
import styles from './screen.module.scss';

interface RoomProps extends RouteComponentProps<{ id: string }> {}
export function RoomScreen(props: RoomProps) {
  const [message, setMessage] = useState('');
  const [postRoomMessage] = useMutation<PostRoomMessageResult, { id: string; content: string }>(
    POST_ROOM_MESSAGE
  );
  const { data: room } = useRoomQuery(props.match.params.id);
  if (!room) return null;

  async function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode !== 13) return;
    setMessage('');

    const result = await postRoomMessage({
      variables: {
        id: props.match.params.id,
        content: message,
      },
    });

    if (!result) return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <MessageList roomId={props.match.params.id} />
        <div className={styles.composer}>
          <Composer value={message} onKeyUp={onKeyUp} onChange={e => setMessage(e.target.value)} />
        </div>
      </div>
      <MemberList members={room.members} />
    </div>
  );
}
