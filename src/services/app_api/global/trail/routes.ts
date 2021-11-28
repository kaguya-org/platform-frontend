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
    return baseApi.get(`/trails/list-all?order=${data?.order}&exclude_my_trails=${data?.exclude_my_trails}&take=${data?.take}&skip=${data?.skip || 0}`);
  },
  getInfo: (data: ShowTrailParams): Promise<AxiosResponse<ShowTrailResponse>> => {
    return baseApi.get(`/trails/show?trail_id=${data.trail_id}`);
  },
}