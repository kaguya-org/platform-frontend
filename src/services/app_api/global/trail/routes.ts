import { AxiosResponse } from 'axios';

import {
  baseApi
} from '../../../api';

import {
  ListTrailParams,
  ShowTrailParams
} from './params';

import {
  ListTrailsResponse,
  ShowTrailResponse
} from './response';

export const trail = {
  list: (data?: ListTrailParams) => {
    return baseApi.get<ListTrailsResponse[]>('/trails/list-all', {
      params: {
        order: data?.order || 'asc',
        exclude_my_trails: data?.exclude_my_trails || false,
        ...(data?.take ? { take: data.take } : {}),
        ...(data?.skip ? { skip: data.skip } : {}),
      }
    });
  },
  getInfo: (data?: ShowTrailParams): Promise<AxiosResponse<ShowTrailResponse>> => {
    return baseApi.get('/trails/show', {
      params: data?.query,
    });
  },
}