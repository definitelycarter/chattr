import React, { ReactChild } from 'react';
import { Redirect } from 'react-router-dom';

interface ProtectedProps {
  children?: ReactChild;
}
export function Protected(props: ProtectedProps) {
  const auth_token = localStorage.getItem('auth_token');
  if (!auth_token) {
    return <Redirect to="/account/login" />;
  }
  return <>{props.children}</>;
}
