import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import styles from './page.module.scss';
import { usePresence } from '../presence/use-presence';
import { SideBar } from './sidebar';
import { Room } from './room';
import { Lobby } from '../lobby';

interface ChatProps extends RouteComponentProps {}
export function ChatPage(props: ChatProps) {
  const presence = usePresence('online');

  return (
    <div className={`chat ${styles.page}`}>
      <div className={styles.container}>
        <div className={styles.sidebar} style={{ width: 100 }}>
          <SideBar presence={presence} />
        </div>
        <div className={styles.content}>
          <Switch>
            <Route path={`${props.match.url}/lobby`} component={Lobby} />
            <Route path={`${props.match.url}/:id`} component={Room} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
