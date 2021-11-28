import { AxiosResponse } from 'axios';

import {
  ADMIN_URL_SOURCE
} from '../';

import {
  baseApi
} from '../../../api';

import {
  CreateTrailParams,
  UpdateTrailParams,
  DeleteTrailParams
} from './params';

import {
  CreateTrailResponse,
  UpdateTrailAvatarResponse
} from './response';

export const trail = {
  create: (data: CreateTrailParams): Promise<AxiosResponse<CreateTrailResponse>> => {
    return baseApi.post(`${ADMIN_URL_SOURCE.sub_admin}/trails`, data);
  },
  update: (data: UpdateTrailParams): Promise<AxiosResponse> => {
    return baseApi.put(`${ADMIN_URL_SOURCE.sub_admin}/trails`, data);
  },
  updateAvatar: (data: FormData): Promise<AxiosResponse<UpdateTrailAvatarResponse>> => {
    return baseApi.patch(`${ADMIN_URL_SOURCE.sub_admin}/trails/avatar`, data);
  },
  delete: (data: DeleteTrailParams): Promise<AxiosResponse> => {
    return baseApi.patch(`${ADMIN_URL_SOURCE.sub_admin}/trails?trail_id=${data.trail_id}`);
  },
}