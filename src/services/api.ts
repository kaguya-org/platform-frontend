import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { 
  LoginParams,
  CreateUserParams,
  CreateUserByAdminParams
} from './apiParams';

import {
  LoginResponse,
  CreateUserResponse,
} from './apiResponse';

export const baseApi = axios.create({
  baseURL:  'https://slinked-test.herokuapp.com'
});

export const api = {
  authenticate: {
    login: (data: LoginParams, config?: AxiosRequestConfig): Promise<AxiosResponse<LoginResponse>> => {
      return baseApi.post('/sessions', data, config);
    }
  },
  user: {
    create: (data: CreateUserParams, config?: AxiosRequestConfig): Promise<AxiosResponse<CreateUserResponse>> => {
      return baseApi.post('/users', data, config);
    },
  },
  admin: {
    createUser: (data: CreateUserByAdminParams, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
      return baseApi.post('/sub-admins/users', data, config);
    }
  }
};