import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

export class ChattrHttpClient extends ApolloClient<unknown> {
  constructor() {
    const link = new HttpLink({
      uri: '/graphql',
    });

    super({
      cache: new InMemoryCache(),
      link,
    });
  }
}
