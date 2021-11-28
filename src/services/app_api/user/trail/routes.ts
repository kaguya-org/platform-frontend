import { AxiosResponse } from 'axios';

import {
  baseApi
} from '../../../api';

import {
  AddTrailInUserParams,
  RemoveTrailInUserParams
} from './params';

import {
  ListAllTrailsFromUserResponse
} from './response';

export const trail = {
  listAllTrailsFromUser: (): Promise<AxiosResponse<ListAllTrailsFromUserResponse[]>> => {
    return baseApi.get('/user-trails/list-all');
  },
  addTrailInUser: (data: AddTrailInUserParams): Promise<AxiosResponse<ListAllTrailsFromUserResponse>> => {
    return baseApi.post('/user-trails', data);
  },
  removeTrailInUser: (data: RemoveTrailInUserParams): Promise<void> => {
    return baseApi.delete(`/user-trails?user_trail_id=${data.user_trail_id}`);
  },
};