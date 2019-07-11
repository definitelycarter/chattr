import React, { useRef } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Route, RouteComponentProps } from 'react-router-dom';
import { ChattrHttpClient as ChattrClient } from '../apollo';
import { LoginPage } from './login/page';
import { RegisterPage } from './register/page';

interface AccountProps extends RouteComponentProps {}
export function Account(props: AccountProps) {
  const clientRef = useRef(new ChattrClient());

  return (
    <>
      <ApolloProvider client={clientRef.current}>
        <Route path={`${props.match.path}/login`} component={LoginPage} />
        <Route path={`${props.match.path}/register`} component={RegisterPage} />
      </ApolloProvider>
    </>
  );
}
