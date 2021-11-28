import { AxiosResponse } from 'axios';

import {
  baseApi
} from '../../../api';

import {
  ListAllPlaylistByTrailParams,
} from './params';

import {
  ListAllPlaylistsByTrailResponse,
} from './response';

export const playlist = {
  listAllByTrail: (data: ListAllPlaylistByTrailParams): Promise<AxiosResponse<ListAllPlaylistsByTrailResponse[]>> => {
    return baseApi.get(`/playlists/trail-list-all?trail_id=${data.trail_id}`);
  }
},