import { AxiosResponse } from 'axios';
import { baseApi } from '../../../api'

import {
  ListAllBlocksParams,
} from './params';

import {
  ListAllBlocksResponse
} from './response';

export const playlist_block = {
  listAllBlocks: (data: ListAllBlocksParams): Promise<AxiosResponse<ListAllBlocksResponse[]>> => {
    return baseApi.get('/blocks/playlist-list-all', {
      params: data,
    })
  }
}