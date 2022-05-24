import { AxiosResponse } from 'axios';
import { baseApi } from '../../../api'

import {
  ListBlocksParams,
  ShowBlockParams,
  ShowLessonParams
} from './params';

import {
  Block, 
  Lesson
} from './response';

export const playlist_block = {
  listBlocks: (data: ListBlocksParams) => {
    return baseApi.get<Block[]>('/blocks/playlist-list-all', {
      params: data.query,
    })
  },
  showLesson: (data: ShowLessonParams) => {
    return baseApi.get<Lesson>('/lessons/show', {
      params: data.query,
    })
  },
  showBlock: (data: ShowBlockParams) => {
    return baseApi.get<Block>('/blocks/show', {
      params: data.query,
    });
  },
}