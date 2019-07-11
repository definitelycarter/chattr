export interface RegisterUserInput {
  email: string;
  username: string;
  password: string;
  password_confirm: string;
}

export interface LoginUserInput {
  username: string;
  password: string;
}

export interface LoginUserResult {
  token: string;
}
