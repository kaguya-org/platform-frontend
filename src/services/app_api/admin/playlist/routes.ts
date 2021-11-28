import { AxiosResponse } from 'axios';

import {
  ADMIN_URL_SOURCE
} from '../';

import {
  baseApi
} from '../../../api';

import {
  CreatePlaylistParams
} from './params';

import {
  CreatePlaylistResponse
} from './response';

export const playlist = {
  create: (data: CreatePlaylistParams): Promise<AxiosResponse<CreatePlaylistResponse>> => {
    return baseApi.post(`${ADMIN_URL_SOURCE.sub_admin}/playlists`, data);
  }
}