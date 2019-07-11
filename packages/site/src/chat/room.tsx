import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

interface RoomProps extends RouteComponentProps<{ id: string }> {}
export function Room(props: RoomProps) {
  return (
    <div>
      Room {props.match.params.id}
      <Link to="/chat/lobby">Back to lobby</Link>
    </div>
  );
}
