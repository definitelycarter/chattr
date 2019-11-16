import React from 'react';
import { Link, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { usePing } from '../apollo';
import { LobbyScreen } from '../lobby';
import { RoomScreen } from '../room';
import styles from './page.module.scss';

interface ChatProps extends RouteComponentProps {}
export function ChatPage(props: ChatProps) {
  usePing();

  return (
    <div className={`chat ${styles.page}`}>
      <header className={styles.header}>
        <nav>
          <Link className={styles.lobby} to="/chat/lobby">
            Lobby
          </Link>
          <Link className={styles.room} to="/chat/9b1962e3-9f8e-47dd-98ab-58e1bcb6a160">
            Rooms
          </Link>
        </nav>
      </header>
      <Switch>
        <Route path={`${props.match.url}/lobby`} component={LobbyScreen} />
        <Route path={`${props.match.url}/:id`} component={RoomScreen} />
      </Switch>
    </div>
  );
}
