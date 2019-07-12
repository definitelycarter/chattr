import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './lobby.module.scss';
import { CREATE_ROOM } from './mutation';
import { QueryRoomsResult, QUERY_ROOMS } from './query';
import { RoomItem } from './room';

interface LobbyProps extends RouteComponentProps {}
export function Lobby(props: LobbyProps) {
  const [name, setName] = useState('');
  const [variables, setVariables] = useState<{ name: string }>();
  const timerRef = useRef<NodeJS.Timer>();

  const { error, data } = useQuery<QueryRoomsResult>(QUERY_ROOMS, {
    fetchPolicy: 'network-only',
    variables: {
      ...variables,
      take: 30,
    },
  });

  useEffect(() => {
    timerRef.current = setTimeout(() => setVariables({ name }), 250);
    return () => clearTimeout(timerRef.current!);
  }, [name]);

  const [createRoom] = useMutation<{ createRoom: string }>(CREATE_ROOM);

  async function onCreateRoom() {
    const result = await createRoom({
      variables: {
        name,
      },
    });

    if (result && result.data) {
      props.history.push(`/chat/${result.data.createRoom}`);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Lobby</h1>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <button onClick={onCreateRoom}>Create Channel</button>
          <input
            className={styles['name-filter']}
            placeholder="Enter a room name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div className={styles['room-list']}>
            {error && <span>{error.message}</span>}
            {data &&
              data.rooms &&
              data.rooms.nodes.map(room => <RoomItem key={room.id} room={room} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
