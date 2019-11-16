import gql from 'graphql-tag';

export const POST_ROOM_MESSAGE = gql`
  mutation PostRoomMessage($id: ID!, $content: String!) {
    postRoomMessage(id: $id, content: $content) {
      id
      room {
        id
      }
    }
  }
`;

export type PostRoomMessageResult = {
  postRoomMessage: {
    id: string;
    room: {
      id: string;
    };
  };
};
