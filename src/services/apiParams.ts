import { AxiosRequestConfig, AxiosResponse } from 'axios';

// define api type
// type ApiMethodType =  <T = any>(data: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;

// auth
export type LoginParams = {
  email: string;
  password: string;
};

// user
export type CreateUserParams = {
  email: string;
  name: string;
  password: string;
};

// admin
export type CreateUserByAdminParams = {
  email: string;
  name: string;
  password: string;
  role: string | 'default';
};
