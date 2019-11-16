import gql from 'graphql-tag';
import { PAGINATION_LIMIT } from '../queries';

export default gql`
  type Room {
    id: ID!
    name: String!
    topic: String
    owner: Member!
    member_count: Int!
    members: [Member!]!
    recent_messages: [Message!]!
  }

  type Member implements IUser {
    id: ID!
    username: String!
    is_admin: Boolean!
    presence: Presence!
  }

  input RoomFilter {
    name: String
  }

  enum RoomEventType {
    user_typing
    user_joined
    user_left
  }

  type RoomEvent {
    type: RoomEventType!
    room: Room!
    member: Member!
  }

  extend type Subscription {
    roomEvent: RoomEvent!
  }

  extend type Mutation {
    """
    Creates a room using the _required_ **name**
    and _optionally_ the room **topic**
    """
    createRoom(name: String!, topic: String): String
    updateRoomTopic(id: ID!, topic: String): Boolean
    joinRoom(id: ID!): Boolean
    leaveRoom(id: ID!): Boolean
    userTypingInRoom(id: ID!): Boolean
  }

  type Rooms implements Pagination {
    nodes: [Room!]!
    count: Int!
  }

  extend type Query {
    """
    Queries rooms using the provided filter options. It
    is required specify the number of items you wish to
    **take**. You cannot **take** more than ${PAGINATION_LIMIT} items.
    """
    rooms(skip: Int, take: Int!, filter: RoomFilter): Rooms
    """
    Fetch a room by the id
    """
    room(id: ID!): Room
  }
`;

export interface MessageInput {
  content: string;
}
