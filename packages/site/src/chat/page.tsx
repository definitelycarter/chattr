import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import styles from './page.module.scss';
import { usePresence } from '../presence/use-presence';
import { SideBar } from './sidebar/sidebar';
import { Room } from './room';
import { Search } from './search';

interface ChatProps extends RouteComponentProps {}
export function ChatPage(props: ChatProps) {
  const presence = usePresence('online');

  return (
    <div className={`chat ${styles.page}`}>
      <div className={styles.container}>
        <Search />
        <div className={styles.sidebar}>
          <SideBar presence={presence} />
        </div>
        <div className={styles.content}>
          <Switch>
            <Route path={`${props.match.url}/:id`} component={Room} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
