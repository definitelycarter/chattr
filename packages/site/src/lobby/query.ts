import gql from 'graphql-tag';

export const QUERY_ROOMS = gql`
  query QueryRooms($skip: Int, $take: Int!, $name: String) {
    rooms(skip: $skip, take: $take, filter: { name: $name }) {
      nodes {
        id
        name
      }
    }
  }
`;

export type Room = {
  id: number;
  name: string;
};
export interface QueryRoomsResult {
  rooms: {
    nodes: Room[];
  };
}
