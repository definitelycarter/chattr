import React, { memo } from 'react';
import { RouteComponentProps } from 'react-router';
import { useRoomQuery } from './query';
import { Room } from './room';

interface RoomProps extends RouteComponentProps<{ id: string }> {}
export const RoomScreen = memo(
  function(props: RoomProps) {
    const { data, loading, error } = useRoomQuery(props.match.params.id);
    if (!data) return null;
    return <Room room={data} />;
  },
  (prev, next) => {
    return prev.match.params.id !== next.match.params.id;
  }
);
