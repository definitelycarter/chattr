import express from 'express';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloClient } from 'apollo-client';
// import { SchemaLink } from 'apollo-link-schema';
// import schema from '../graphql';
// import gql from 'graphql-tag';

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new SchemaLink({ schema, context: { token: '123' } }),
// });

const router = express.Router();

router.get('/authorize', async (req, res) => {
  res.end();
  // const result = await client.mutate({
  //   variables: {
  //     input: {
  //       username: 'definitelycarter',
  //       password: 'abc',
  //     },
  //   },
  //   mutation: gql`
  //     mutation LoginUser($input: LoginUserInput!) {
  //       loginUser(input: $input) {
  //         token
  //       }
  //     }
  //   `,
  // });

  // res.send(result.data);
});

export default router;
