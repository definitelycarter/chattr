import { useFormik } from 'formik';
import React from 'react';
import { useMutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom'
import { RegisterUserInput, RegisterUserResult, REGISTER_USER_MUTATION } from './mutation';

interface RegisterProps extends RouteComponentProps<never> {
}
export function Register(props: RegisterProps) {
  const [registerUser] = useMutation<RegisterUserResult, RegisterUserInput>(REGISTER_USER_MUTATION)
  const { isSubmitting, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      password_confirm: ''
    },
    onSubmit: async (values) => {
      const result = await registerUser({
        variables: values
      })
      const token = result.data?.registerUser?.token;
      if (!token) throw new Error('Token was not returned');
      localStorage.setItem('token', token);
      props.history.push('/chat/lobby');
    }
  })
  return (
    <div className="h-full flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="mb-1 block">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email@address.com"
            className="border px-2 py-1 rounded focus:border-blue-600 focus:outline-none"
            onChange={handleChange}
            value={values.email}
          />
        </div>
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
        <div className="mb-2">
          <label className="mb-1 block">Confirm Password</label>
          <input
            name="password_confirm"
            type="password"
            placeholder="Confirm Password"
            className="border px-2 py-1 rounded focus:border-blue-600 focus:outline-none"
            onChange={handleChange}
            value={values.password_confirm}
          />
        </div>
        <button
          type="submit"
          className="px-2 py-1 rounded active:bg-blue-400 bg-blue-600 focus:outline-none"
          disabled={isSubmitting}
        >
          Register
        </button>
      </form>
    </div>
  )
}