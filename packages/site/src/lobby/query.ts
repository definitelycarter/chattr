import gql from 'graphql-tag';

export const QUERY_ROOMS = gql`
  query QueryRooms($skip: Int, $take: Int!, $name: String) {
    rooms(skip: $skip, take: $take, filter: { name: $name }) {
      nodes {
        id
        name
        topic
        owner {
          id
          username
        }
        member_count
      }
    }
  }
`;

export type Room = {
  id: string;
  name: string;
  topic: string;
  owner: {
    id: string;
    username: string;
  };
  member_count: number;
};
export interface QueryRoomsResult {
  rooms: {
    nodes: Room[];
  };
}
