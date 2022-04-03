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
  listAllByTrailAndUser: (data?: ListAllPlaylistByTrailParams): Promise<AxiosResponse<ListAllPlaylistsByTrailResponse[]>> => {
    return baseApi.get(`/playlists/trail-list-all?trail_id=${data.trail_id}`);
  },
};