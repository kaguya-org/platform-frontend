import { AxiosResponse } from 'axios';

import {
  baseApi
} from '../../../api';

import {
  ListAllTrailParams,
  ShowTrailParams
} from './params';

import {
  ListAllTrailsResponse,
  ShowTrailResponse
} from './response';

export const trail = {
  listAll: (data?: ListAllTrailParams): Promise<AxiosResponse<ListAllTrailsResponse[]>> => {
    return baseApi.get('/trails/list-all', {
      params: {
        order: data?.order || 'asc',
        exclude_my_trails: data?.exclude_my_trails || false,
        ...(data?.take ? { take: data.take } : {}),
        ...(data?.skip ? { skip: data.skip } : {}),
      }
    });
  },
  getInfo: (data: ShowTrailParams): Promise<AxiosResponse<ShowTrailResponse>> => {
    return baseApi.get(`/trails/show?trail_id=${data.trail_id}`);
  },
}