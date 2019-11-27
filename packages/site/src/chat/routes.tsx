import React, { useRef, useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { ChattrWsClient as ChattrClient } from '../apollo';
import { ChatPage } from './page';

type Status = 'connected' | 'disconnected';
interface ChatProps extends RouteComponentProps { }
export default function ChatApp(props: ChatProps) {
  const [, setStatus] = useState<Status>('disconnected');

  const clientRef = useRef(
    new ChattrClient({
      token: localStorage.getItem('auth_token'),
      onConnected: () => setStatus('connected'),
      onDisconnected: () => setStatus('disconnected'),
    })
  );

  useEffect(() => {
    const { current: client } = clientRef;
    return () => client.close();
  }, []);

  return (
    <ApolloProvider client={clientRef.current}>
      <ChatPage {...props} />
    </ApolloProvider>
  );
}
