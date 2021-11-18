import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { 
  LoginParams,
  CreateUserByAdminParams,
  CreateTrailParams,
  UpdateTrailParams,
  DeleteTrailParams,
  CreatePlaylistParams,
  ListAllByTrailParams,
  AddTrailInUserParams,
  ShowTrailParams,
  RemoveTrailInUserParams,
  RegisterUserParams,
} from './apiParams';

import {
  LoginResponse,
  RegisterUserResponse,
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
  create: (data: CreateTrailParams): Promise<AxiosResponse<CreateTrailResponse>> => {
    return baseApi.post(`${adminResource}/trails`, data);
  },
  update: (data: UpdateTrailParams): Promise<AxiosResponse> => {
    return baseApi.put(`${adminResource}/trails`, data);
  },
  updateAvatar: (data: FormData): Promise<AxiosResponse<UpdateTrailAvatarResponse>> => {
    return baseApi.patch(`${adminResource}/trails/avatar`, data);
  },
  delete: (data: DeleteTrailParams): Promise<AxiosResponse> => {
    return baseApi.patch(`${adminResource}/trails?trail_id=${data.trail_id}`);
  },
};

const adminPlaylistApi = {
  create: (data: CreatePlaylistParams): Promise<AxiosResponse<CreatePlaylistResponse>> => {
    return baseApi.post(`${adminResource}/playlists`, data);
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
    login: (data: LoginParams): Promise<AxiosResponse<LoginResponse>> => {
      return baseApi.post('/sessions', data);
    }
  },
  user: {
    register: (data: RegisterUserParams): Promise<AxiosResponse<RegisterUserResponse>> => {
      return baseApi.post('/users', data);
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
    createUser: (data: CreateUserByAdminParams): Promise<AxiosResponse> => {
      return baseApi.post('/sub-admins/users', data);
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
    },
  }
};
