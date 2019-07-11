import React, { useRef, useEffect } from 'react';
import { Formik } from 'formik';
import styles from './form.module.scss';
import { Link } from 'react-router-dom';

interface RegisterFormProps {
  onRegister?: (token: string) => void;
}
export function RegisterForm(props: RegisterFormProps) {
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!emailRef.current) return;
    emailRef.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
        password_confirm: '',
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          await sleep(1000);
          props.onRegister!('123');
        } finally {
          setSubmitting(false);
        }

        return;
      }}
      render={({ values, handleChange, submitForm, isSubmitting }) => (
        <form className={styles.register}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="text"
              ref={emailRef}
              placeholder="email@address.com"
              value={values.email}
              onChange={handleChange('email')}
            />
          </div>
          <div className={styles.field}>
            <label>Username</label>
            <input
              type="text"
              placeholder="username"
              value={values.username}
              onChange={handleChange('username')}
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              value={values.password}
              onChange={handleChange('password')}
            />
          </div>
          <div className={styles.field}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="confirm password"
              value={values.password_confirm}
              onChange={handleChange('password_confirm')}
            />
          </div>
          <button
            type="submit"
            onClick={submitForm}
            disabled={isSubmitting}
            className={styles.primary}
          >
            Register
          </button>
          <div className={styles.wrapper}>
            <span>
              Already have an account? <Link to="/account/login">Login</Link>
            </span>
          </div>
        </form>
      )}
    />
  );
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
