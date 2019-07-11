import React from 'react';
import { RouteComponentProps } from 'react-router';
import { LoginForm } from './form';
import styles from './page.module.scss';

interface LoginPageProps extends RouteComponentProps {}
export function LoginPage(props: LoginPageProps) {
  return (
    <div className={`login ${styles.page}`}>
      <div className={styles.container}>
        <LoginForm
          onLogin={(token: string) => {
            localStorage.setItem('auth_token', token);
            props.history.push('/chat/lobby');
          }}
        />
      </div>
    </div>
  );
}
