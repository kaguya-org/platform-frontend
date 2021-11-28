import { AxiosResponse } from 'axios';

import {
  baseApi
} from '../../../api';

import {
  RegisterUserParams,
  LoginParams
} from './params';

import {
  RegisterUserResponse,
  User,
  TokenValidResponse,
  LoginResponse
} from './response';

export const geral = {
  register: (data: RegisterUserParams): Promise<AxiosResponse<RegisterUserResponse>> => {
    return baseApi.post('/users', data);
  },
  getProfile: (): Promise<AxiosResponse<User>> => {
    return baseApi.get('/profile');
  },
  token: {
    validate: (): Promise<AxiosResponse<TokenValidResponse>> => {
      return baseApi.post('/users/tokens/validate-token');
    }
  },
  authenticate: {
    login: (data: LoginParams): Promise<AxiosResponse<LoginResponse>> => {
      return baseApi.post('/sessions', data);
    }
  },
}