import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { 
  LoginParams,
  CreateUserParams,
  CreateUserByAdminParams,
  CreateTrailParams,
  UpdateTrailParams,
  DeleteTrailParams,
  CreatePlaylistParams,
  ListAllByTrailParams,
  AddTrailInUserParams,
  ShowTrailParams,
  RemoveTrailInUserParams,
} from './apiParams';

import {
  LoginResponse,
  CreateUserResponse,
  CreateTrailResponse,
  UpdateTrailAvatarResponse,
  ListAllTrailsResponse,
  ListAllPlaylistsByTrailResponse,
  CreatePlaylistResponse,
  User,
  TokenValidResponse,
  ListAllTrailsFromUserResponse,
  ShowTrailResponse
} from './apiResponse';

export const slinkedApiToken = '@slinked:token';

export const baseApi = axios.create({
  baseURL: 'https://slinked-test.herokuapp.com',
});

let localStorageToken = localStorage.getItem(slinkedApiToken);

baseApi.defaults.headers.common['Authorization'] = `Bearer ${localStorageToken}`;

const adminResource = '/sub-admins';

const adminTrailApi = {
  create: (data: CreateTrailParams, config?: AxiosRequestConfig): Promise<AxiosResponse<CreateTrailResponse>> => {
    return baseApi.post(`${adminResource}/trails`, data, config);
  },
  update: (data: UpdateTrailParams, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return baseApi.put(`${adminResource}/trails`, data, config);
  },
  updateAvatar: (data: FormData, config?: AxiosRequestConfig): Promise<AxiosResponse<UpdateTrailAvatarResponse>> => {
    return baseApi.patch(`${adminResource}/trails/avatar`, data, config);
  },
  delete: (data: DeleteTrailParams, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return baseApi.patch(`${adminResource}/trails?trail_id=${data.trail_id}`, config);
  },
};

const adminPlaylistApi = {
  create: (data: CreatePlaylistParams, config?: AxiosRequestConfig): Promise<AxiosResponse<CreatePlaylistResponse>> => {
    return baseApi.post(`${adminResource}/playlists`, data, config);
  }
};

const userTrails = {
  listAllTrailsFromUser: (): Promise<AxiosResponse<ListAllTrailsFromUserResponse[]>> => {
    return baseApi.get('/user-trails/list-all');
  },
  addTrailInUser: (data: AddTrailInUserParams): Promise<AxiosResponse<ListAllTrailsFromUserResponse>> => {
    return baseApi.post('/user-trails', data);
  },
  removeTrailInUser: (data: RemoveTrailInUserParams): Promise<void> => {
    return baseApi.delete(`/user-trails?user_trail_id=${data.user_trail_id}`);
  },
};

export const api = {
  authenticate: {
    login: (data: LoginParams, config?: AxiosRequestConfig): Promise<AxiosResponse<LoginResponse>> => {
      return baseApi.post('/sessions', data, config);
    }
  },
  user: {
    create: (data: CreateUserParams, config?: AxiosRequestConfig): Promise<AxiosResponse<CreateUserResponse>> => {
      return baseApi.post('/users', data, config);
    },
    getProfile: (): Promise<AxiosResponse<User>> => {
      return baseApi.get('/profile');
    },
    token: {
      validate: (): Promise<AxiosResponse<TokenValidResponse>> => {
        return baseApi.post('/users/tokens/validate-token');
      }
    },
    userTrails: {
      ...userTrails
    },
  },
  admin: {
    createUser: (data: CreateUserByAdminParams, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
      return baseApi.post('/sub-admins/users', data, config);
    },
    trail: {
      ...adminTrailApi
    },
    playlist: {
      ...adminPlaylistApi
    }
  },
  global: {
    trail: {
      listAll: (): Promise<AxiosResponse<ListAllTrailsResponse[]>> => {
        return baseApi.get('/trails/list-all');
      },
      getInfo: (data: ShowTrailParams): Promise<AxiosResponse<ShowTrailResponse>> => {
        return baseApi.get(`/trails/show?trail_id=${data.trail_id}`);
      },
    },
    playlist: {
      listAllByTrail: (data: ListAllByTrailParams): Promise<AxiosResponse<ListAllPlaylistsByTrailResponse[]>> => {
        return baseApi.get(`/playlists/trail-list-all?trail_id=${data.trail_id}`);
      }
    },
    roles: {
      // listAll: (): Promise<AxiosResponse<ListAllRolesResponse[]>> => {
      //   return baseApi.get('/roles/list-all');
      // }
    }
  }
};
