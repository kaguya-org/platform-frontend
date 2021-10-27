import { AxiosError } from 'axios';

// global
export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  username: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type ApiErrorResponse = AxiosError & {
  response?: {
    data: {
      message: string;
      status: string;
      statusCode: number;
    }
  }
}

// auth
export type LoginResponse = {
  user: User,
  token: string;
}

// user
export type CreateUserResponse = {
  user: User;
  platform_user_roles: Array<{
    id: string;
    platform_role: {
      id: string;
      role: string | 'default';
      permision: number,
      created_at: string;
      updated_at: string;
    }
  }>
}

// admin