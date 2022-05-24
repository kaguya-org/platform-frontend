import { AxiosResponse } from 'axios';

import {
  baseApi
} from '../../../api';

import {
  ShowLessonParams
} from './params';

import {
  ShowLessonResponse
} from './response';

export const lesson = {
  show: (data?: ShowLessonParams): Promise<AxiosResponse<ShowLessonResponse>> => {
    return baseApi.get('/lessons/show', {
      params: data?.query
    });
  },
}