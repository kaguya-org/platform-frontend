import { AxiosResponse } from 'axios';

import {
  baseApi
} from '../../../api';

import {
  ShowRecentHistoryParams
} from './params';

import {
  ShowHistoryResponse
} from './response';

export const history = {
  show: (data?: ShowRecentHistoryParams): Promise<AxiosResponse<ShowHistoryResponse>> => {
    return baseApi.get('/histories/show', {
      params: data?.query
    });
  },
}