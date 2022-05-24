import { AxiosResponse } from 'axios';

import {
  baseApi
} from '../../../api';

import {
  AddTrailInUserParams,
  listTrailsFromUserParams,
  RemoveTrailInUserParams
} from './params';

import {
  ListTrailFromUserResponse
} from './response';

export const trail = {
  listTrailsFromUser: (params?: listTrailsFromUserParams) => {
    return baseApi.get<ListTrailFromUserResponse[]>('/user-trails/list-all', {
      params
    });
  },
  addTrailInUser: (data: AddTrailInUserParams) => {
    return baseApi.post<ListTrailFromUserResponse>('/user-trails', data);
  },
  removeTrailInUser: (data: RemoveTrailInUserParams): Promise<void> => {
    return baseApi.delete(`/user-trails`, {
      params: data
    });
  },
  changeEnabled: (trail_id: string): Promise<void> => {
    return baseApi.patch(`/user-trails/change-enabled`, {
      trail_id
    });
  },
};