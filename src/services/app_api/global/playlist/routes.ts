import { AxiosResponse } from 'axios';

import {
  baseApi
} from '../../../api';

import {
  ListAllPlaylistByTrailParams,
  ShowPlaylistParams
} from './params';

import {
  ListAllPlaylistsByTrailResponse,
  ShowPlaylistResponse
} from './response';

export const playlist = {
  listAllByTrail: (data: ListAllPlaylistByTrailParams): Promise<AxiosResponse<ListAllPlaylistsByTrailResponse[]>> => {
    return baseApi.get(`/playlists/trail-list-all?trail_id=${data.trail_id}`);
  },
  getInfo: (data: ShowPlaylistParams): Promise<AxiosResponse<ShowPlaylistResponse>> => {
    return baseApi.get('/playlists/show', {
      params: data
    })
  }
}