import React from 'react';
import { Status } from './status';
import { Presence } from '@chattr/types';

interface AvatarProps {
  presence: Presence;
}
export function Avatar(props: AvatarProps) {
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          height: 40,
          width: 40,
          borderRadius: '50%',
          background: `url(https://avatars1.githubusercontent.com/u/6287039?s=40&v=4)`,
        }}
      />
      <div
        style={{
          top: -2,
          left: -2,
          position: 'absolute',
        }}
      >
        <Status presence={props.presence} />
      </div>
    </div>
  );
}