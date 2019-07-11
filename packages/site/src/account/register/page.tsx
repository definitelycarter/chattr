import React from 'react';
import { RouteComponentProps } from 'react-router';
import styles from './page.module.scss';
import { RegisterForm } from './form';

interface RegisterPageProps extends RouteComponentProps {}
export function RegisterPage(props: RegisterPageProps) {
  return (
    <div className={`login ${styles.page}`}>
      <div className={styles.container}>
        <RegisterForm
          onRegister={token => {
            props.history.push('/chat/lobby');
            return;
          }}
        />
      </div>
    </div>
  );
}
