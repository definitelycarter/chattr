import React, { useState } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { usePing } from '../apollo';
import styles from './page.module.scss';
import { SideBar } from './sidebar/sidebar';
import { RoomScreen } from '../room';

interface ChatProps extends RouteComponentProps {}
export function ChatPage(props: ChatProps) {
  usePing();
  const [presence] = useState<'online' | 'away' | 'offline'>('online');

  return (
    <div className={`chat ${styles.page}`}>
      <div className={styles.container}>
        {/* <Search /> */}
        <div className={styles.sidebar}>
          <SideBar presence={presence} />
        </div>
        <div className={styles.content}>
          <Switch>
            <Route path={`${props.match.url}/:id`} component={RoomScreen} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
