export type RegisterUserParams = {
  email: string;
  name?: string;
  password: string;
  username: string;
  role?: string;
}

export type LoginParams = {
  email: string;
  password: string;
};