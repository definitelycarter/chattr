import gql from 'graphql-tag';
import { PAGINATION_LIMIT } from '../queries';

export default gql`
  type User implements IUser {
    id: ID!
    username: String
    presence: Presence!
  }

  interface IUser {
    id: ID!
    username: String
    presence: Presence!
  }

  input UserFilter {
    username: String
  }

  type Viewer {
    id: ID!
    username: String!
    presence: Presence!
    rooms: [Room]!
  }

  type LoginUserResult {
    token: String!
  }

  extend type Mutation {
    registerUser(
      email: String!
      username: String!
      password: String!
      password_confirm: String!
    ): LoginUserResult
    loginUser(username: String!, password: String!): LoginUserResult
  }

  type Users implements Pagination {
    nodes: [User!]!
    count: Int!
  }

  extend type Query {
    """
    Queries rooms using the provided filter options. It
    is required specify the number of items you wish to
    **take**. You cannot **take** more than ${PAGINATION_LIMIT} items.
    """
    users(skip: Int, take: Int, filter: UserFilter): Users!
    me: Viewer
  }
`;
