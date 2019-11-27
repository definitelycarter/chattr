import gql from "graphql-tag";

export type RegisterUserInput = {
  email: string
  username: string
  password: string
  password_confirm: string
};

export type RegisterUserResult = {
  registerUser: {
    token: string
  }
}

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($email: String!, $username: String!, $password: String!, $password_confirm: String!) {
    registerUser(email: $email, username: $username, password: $password, password_confirm: $password_confirm) {
      token
    }
  }
`;

export type LoginUserInput = {
  username: string
  password: string
};

export type LoginUserResult = {
  loginUser: {
    token: string
  }
}

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;