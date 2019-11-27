import { useFormik } from 'formik';
import React from 'react';
import { useMutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom'
import { LoginUserInput, LoginUserResult, LOGIN_USER_MUTATION } from './mutation';

interface LoginProps extends RouteComponentProps<never> {
}
export function Login(props: LoginProps) {
  const [loginUser] = useMutation<LoginUserResult, LoginUserInput>(LOGIN_USER_MUTATION)
  const { isSubmitting, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const result = await loginUser({
        variables: values
      })
      const token = result.data?.loginUser?.token;
      if (!token) throw new Error('Token was not returned');
      localStorage.setItem('token', token);
      props.history.push('/chat/lobby');
    },
  })
  return (
    <div className="h-full flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="mb-1 block">Username</label>
          <input
            name="username"
            type="text"
            placeholder="username"
            className="border px-2 py-1 rounded focus:border-blue-600 focus:outline-none"
            onChange={handleChange}
            value={values.username}
          />
        </div>
        <div className="mb-2">
          <label className="mb-1 block">Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            className="border px-2 py-1 rounded focus:border-blue-600 focus:outline-none"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        <button
          type="submit"
          className="px-2 py-1 rounded active:bg-blue-400 bg-blue-600 focus:outline-none"
          disabled={isSubmitting}
        >
          Login
        </button>
      </form>
    </div>
  )
}
