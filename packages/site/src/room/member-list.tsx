import React from 'react';
import styles from './member-list.module.scss';
import { RoomQuery } from './query';

interface MemberListProps {
  members: RoomQuery['room']['members'];
}
export function MemberList(props: MemberListProps) {
  return (
    <div className={styles.container}>
      <ul className={styles.members}>
        {props.members
          .filter(member => member.presence !== 'offline')
          .map(member => {
            return (
              <li key={member.id}>
                <div className={[styles.presence, styles[member.presence]].join(' ')}></div>
                <span className={styles.username}>{member.username}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
