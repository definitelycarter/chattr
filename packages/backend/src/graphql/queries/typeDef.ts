import gql from 'graphql-tag';

export default gql`
  scalar Date
  interface Pagination {
    count: Int!
  }
  type Query
`;
