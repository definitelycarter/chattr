import gql from 'graphql-tag';
import { PAGINATION_LIMIT } from '../queries';

export default gql`
  type Message {
    content: String!
    id: ID!
    sent_at: Date!
    room: Room!
    author: User!
  }

  input MessageInput {
    room_id: ID!
    content: String!
  }

  extend type Mutation {
    postRoomMessage(id: ID!, content: String!): Message
  }

  type MessagesQuery {
    nodes: [Message!]!
    count: Int!
  }

  extend type Subscription {
    roomMessagePosted: Message
  }
  extend type Query {
    """
    Queries rooms using the provided filter options. It
    is required specify the number of items you wish to
    **take**. You cannot **take** more than ${PAGINATION_LIMIT} items.
    """
    messages(skip: Int, take: Int!): MessagesQuery!
  }
`;

export interface Message {
  room_id: number;
  sent_at: Date;
  content: string;
}
export interface MessageInput {
  room_id: number;
  content: string;
}
