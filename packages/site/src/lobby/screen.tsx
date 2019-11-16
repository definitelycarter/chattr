import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { CreateRoomResult, CREATE_ROOM } from './mutation';
import { QueryRoomsResult, QUERY_ROOMS } from './query';
import styles from './screen.module.scss';

interface LobbyProps extends RouteComponentProps {}
export function LobbyScreen(props: LobbyProps) {
  const [name, setName] = useState('');
  const [variables, setVariables] = useState<{ name: string }>();
  const timerRef = useRef<NodeJS.Timer>();

  const { data } = useQuery<QueryRoomsResult>(QUERY_ROOMS, {
    fetchPolicy: 'network-only',
    variables: {
      ...variables,
      take: 30,
    },
  });

  const [createRoom] = useMutation<CreateRoomResult, { name: string }>(CREATE_ROOM);

  useEffect(() => {
    timerRef.current = setTimeout(() => setVariables({ name }), 250);
    return () => clearTimeout(timerRef.current!);
  }, [name]);

  function isRoomValid(name: string) {
    if (!name) return false;
    return /^[a-zA-Z0-9-]*$/.test(name);
  }

  function navigateToRoom(room_id: string) {
    props.history.push(`/chat/${room_id}`);
  }

  async function onAddRoom(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const result = await createRoom({ variables: { name } });
    if (!result) return;
    const room_id = result.data!.createRoom;
    navigateToRoom(room_id);
  }

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <input
          className={styles.filter}
          type="text"
          placeholder="Find a room..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button disabled={!isRoomValid(name)} onClick={onAddRoom}>
          Add
        </button>
      </div>
      <div className={styles.rooms}>
        {data &&
          data.rooms &&
          data!.rooms.nodes.map(room => {
            return (
              <div key={room.id} className={styles.room} onClick={() => navigateToRoom(room.id)}>
                <div className={styles.name}>{room.name}</div>
                <div className={styles.topic}>{room.topic}</div>
                <div className={styles.createdBy}>
                  <span>
                    Created By: <span className={styles.count}>{room.owner.username}</span>
                  </span>
                </div>
                <div className={styles.users}>
                  <span>
                    Users: <span className={styles.count}>{room.member_count}</span>
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
