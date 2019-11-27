import React, { useRef } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Route, RouteComponentProps } from 'react-router-dom';
import { ChattrHttpClient as ChattrClient } from '../apollo';
import { Register } from './register';
import { Login } from './login';

interface AccountProps extends RouteComponentProps { }
export default function Account(props: AccountProps) {
  const clientRef = useRef(new ChattrClient());
  return (
    <ApolloProvider client={clientRef.current}>
      <Route path={`${props.match.path}/login`} component={Login} />
      <Route path={`${props.match.path}/register`} component={Register} />
    </ApolloProvider>
  );
}
