import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const Account = React.lazy(() => import('./account/routes'))
const Chat = React.lazy(() => import('./chat/routes'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Route path="/account" component={Account} />
        <Route path="/chat" component={Chat} />
        <Route path="/" exact render={() => {
          return <Redirect to="/chat" />
        }}
        />
      </Suspense>
    </Router>
  );
}
