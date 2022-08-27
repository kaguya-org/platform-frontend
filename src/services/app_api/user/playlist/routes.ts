import { AxiosResponse } from 'axios';

import {
  baseApi
} from '../../../api';
import { ListAllPlaylistsByTrailResponse } from '../../global/types';
import { ListAllPlaylistByTrailParams } from './params';

export const trail = {
  listAllByTrailAndUser: (data?: ListAllPlaylistByTrailParams): Promise<AxiosResponse<ListAllPlaylistsByTrailResponse[]>> => {
    return baseApi.get(`/playlists/trail-list-all`, {
      params: {
        ...(data ? {
          trail_id: data.trail_id
        }: {})
      }
    });
  },
};