import React from 'react';
import styles from './search.module.scss';
import { Flyout } from '../sidebar/flyout';
import { Room } from './query';

interface SearchProps {
  error: Error | undefined;
  loading: boolean;
  onChange: (query: string) => void;
  query: string;
  items: Room[];
}
export function Search(props: SearchProps) {
  return (
    <Flyout className={styles.container}>
      <Flyout.Header>Search</Flyout.Header>
      <Flyout.Body>
        <input
          type="text"
          value={props.query}
          className={styles.filter}
          placeholder="Search for a room"
          onChange={e => props.onChange(e.target.value)}
        />
        <div style={{ paddingTop: 10 }}>
          {props.items.map(room => (
            <div key={room.id}>
              <div className={styles.name}>{room.name}</div>
            </div>
          ))}
        </div>
      </Flyout.Body>
    </Flyout>
  );
}
