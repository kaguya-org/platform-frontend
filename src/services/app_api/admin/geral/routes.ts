import { AxiosResponse } from 'axios';

import {
  ADMIN_URL_SOURCE
} from '../';

import {
  baseApi
} from '../../../api';

import {
  RegisterUserByAdminParams,
} from './params';

import {
} from './response';

export const geral = {
  createUser: (data: RegisterUserByAdminParams): Promise<AxiosResponse> => {
    return baseApi.post(`${ADMIN_URL_SOURCE.sub_admin}/users`, data);
  },
}