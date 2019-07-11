import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import styles from './form.module.scss';
import { Link } from 'react-router-dom';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { LoginUserInput, LoginUserResult } from '@chattr/types';

interface LoginFormProps {
  onLogin: (token: string) => void;
}
export function LoginForm(props: LoginFormProps) {
  const usernameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!usernameRef.current) return;
    usernameRef.current.focus();
  }, []);

  return (
    <Mutation mutation={LOGIN_USER}>
      {(addTodo: MutationFn<LoginUserMutationResult, LoginUserMutation>) => (
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const result = await addTodo({ variables: values });
              if (!result || !result.data) return;
              const { token } = result.data.loginUser;
              props.onLogin(token);
            } finally {
              setSubmitting(false);
            }
          }}
          render={({ values, handleChange, submitForm, isSubmitting }) => (
            <form className={styles.login}>
              <div className={styles.field}>
                <label>Username</label>
                <input
                  type="text"
                  ref={usernameRef}
                  placeholder="username"
                  value={values.username}
                  onChange={handleChange('username')}
                  autoComplete="username"
                />
              </div>
              <div className={styles.field}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  value={values.password}
                  onChange={handleChange('password')}
                  autoComplete="password"
                />
              </div>
              <button
                type="submit"
                onClick={submitForm}
                disabled={isSubmitting}
                className={styles.primary}
              >
                Login
              </button>
              <div className={styles.wrapper}>
                <span>
                  Need an account? <Link to="/account/register">Register</Link>
                </span>
              </div>
            </form>
          )}
        />
      )}
    </Mutation>
  );
}

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;

type LoginUserMutation = LoginUserInput;
type LoginUserMutationResult = { loginUser: LoginUserResult };
