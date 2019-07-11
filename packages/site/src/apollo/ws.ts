import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

export class ChattrWsClient extends ApolloClient<unknown> {
  private readonly ws: SubscriptionClient;

  constructor(options: {
    token: string | null;
    onConnected: () => void;
    onDisconnected: () => void;
  }) {
    const client = new SubscriptionClient(`ws://${window.location.host}/graphql`, {
      lazy: true,
      reconnect: true,
      connectionParams: {
        token: options.token,
      },
    });

    client.onConnected(options.onConnected);
    client.onReconnected(options.onConnected);
    client.onDisconnected(options.onDisconnected);

    const link = new WebSocketLink(client);

    super({
      cache: new InMemoryCache(),
      link,
    });

    this.ws = client;
  }

  close() {
    this.ws.close();
  }
}
