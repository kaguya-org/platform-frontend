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
  getProfile: () => {
    return baseApi.get<User>('/profile');
  },
  token: {
    validate: (): Promise<AxiosResponse<TokenValidResponse>> => {
      return baseApi.post('/users/tokens/validate-token');
    }
  },
  authenticate: {
    login: (data: LoginParams) => {
      return baseApi.post<LoginResponse>('/sessions', data);
    }
  },
}