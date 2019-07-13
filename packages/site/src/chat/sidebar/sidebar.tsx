import React from 'react';
import styles from './sidebar.module.scss';
import { Avatar } from './avatar';
import { Presence } from '@chattr/types';
import { Search } from '../search/search';
import { Flyout } from './flyout';
import { ReactComponent as SearchIcon } from '../../content/svg/search.svg';

interface SideBarProps {
  presence: Presence;
}
export function SideBar(props: SideBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Avatar presence={props.presence} />
      </div>
      <div className={styles.nav}>
        <button className={styles.button}>
          <SearchIcon width={32} height={32} />
        </button>
      </div>
    </div>
  );
}
