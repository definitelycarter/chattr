import gql from 'graphql-tag';

export const CREATE_ROOM = gql`
  mutation CreateRoomMutation($name: String!) {
    createRoom(name: $name)
  }
`;

export type CreateRoomResult = {
  createRoom: string;
};
