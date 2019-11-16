import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const QUERY_ROOM = gql`
  query RoomQuery($id: ID!) {
    room(id: $id) {
      id
      name
      owner {
        id
        username
      }
      members {
        id
        username
        is_admin
        presence
      }
      messages: recent_messages {
        id
        author {
          id
          username
        }
        sent_at
        content
      }
    }
  }
`;

export function useRoomQuery(id: string) {
  const { data, loading, error } = useQuery<RoomQuery, { id: string }>(QUERY_ROOM, {
    variables: {
      id,
    },
  });

  return {
    data: data && data.room,
    loading,
    error,
  };
}

type Owner = {
  id: string;
  username: string;
};
type Member = {
  id: string;
  username: string;
  is_admin?: boolean;
  presence: 'online' | 'away' | 'offline';
};
type Message = {
  id: string;
  author: Member;
  sent_at: string;
  content: string;
};
export type Room = {
  id: string;
  name: string;
  owner: Owner;
  members: Member[];
  messages: Message[];
};

export type RoomQuery = { room: Room };
