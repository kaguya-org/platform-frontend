import { AxiosResponse } from 'axios';

import {
  baseApi
} from '../../../api';

import {
  AddTrailInUserParams,
  RemoveTrailInUserParams
} from './params';

import {
  ListTrailFromUserResponse
} from './response';

export const trail = {
  listTrailsFromUser: () => {
    return baseApi.get<ListTrailFromUserResponse[]>('/user-trails/list-all');
  },
  addTrailInUser: (data: AddTrailInUserParams) => {
    return baseApi.post<ListTrailFromUserResponse>('/user-trails', data);
  },
  removeTrailInUser: (data: RemoveTrailInUserParams): Promise<void> => {
    return baseApi.delete(`/user-trails?user_trail_id=${data.user_trail_id}`);
  },
};