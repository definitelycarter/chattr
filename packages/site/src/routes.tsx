import React from 'react';
import { Route } from 'react-router-dom';
import { Account } from './account/routes';
import { ChatApp } from './chat/routes';
import { Protected } from './account/protected';

export default (
  <>
    <Route path="/account" component={Account} />
    <Route
      path="/chat"
      render={props => (
        <Protected>
          <ChatApp {...props} />
        </Protected>
      )}
    />
  </>
);
