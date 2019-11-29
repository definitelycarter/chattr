import React, { ReactNode, useReducer } from 'react';
import { useApolloClient, useSubscription, useQuery } from 'react-apollo';
import Context from './context';
import { reducer } from './state';
import gql from 'graphql-tag';

interface RoomProviderProps {
  children: ReactNode | ReactNode[];
}
export function RoomProvider(props: RoomProviderProps) {
  const client = useApolloClient();
  const [{ rooms }, dispatch] = useReducer(reducer, { rooms: [] });

  useQuery(gql`
    query {
      me {
        rooms {
          id
          name
        }
      }
    }
  `);

  return (
    <Context.Provider
      value={{
        rooms,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
