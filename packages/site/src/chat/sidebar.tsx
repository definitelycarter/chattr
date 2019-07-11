import React from 'react';
import styles from './sidebar.module.scss';
import { Avatar } from '../components/avatar';
import { Presence } from '@chattr/types';

interface SideBarProps {
  presence: Presence;
}
export function SideBar(props: SideBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Avatar presence={props.presence} />
      </div>
    </div>
  );
}
