import { AxiosResponse } from 'axios';
import { baseApi } from '../../../api'

import {
  ListBlocksParams,
  ShowBlockParams,
  ShowClasseParams
} from './params';

import {
  Block, 
  Classe
} from './response';

export const playlist_block = {
  listBlocks: (data: ListBlocksParams) => {
    return baseApi.get<Block[]>('/blocks/playlist-list-all', {
      params: data.query,
    })
  },
  showClasse: (data: ShowClasseParams) => {
    return baseApi.get<Classe>('/classes/show', {
      params: data.query,
    })
  },
  showBlock: (data: ShowBlockParams) => {
    return baseApi.get<Block>('/blocks/show', {
      params: data.query,
    });
  },
}