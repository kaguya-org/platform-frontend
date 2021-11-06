import { AxiosRequestConfig, AxiosResponse } from 'axios';

// define api type
// type ApiMethodType =  <T = any>(data: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;

// auth
export type LoginParams = {
  email: string;
  password: string;
};

// user
export type CreateUserParams = {
  email: string;
  name: string;
  password: string;
};

// admin
export type CreateUserByAdminParams = {
  email: string;
  name: string;
  password: string;
  role: string | 'default';
};

export type CreateTrailParams = {
  name: string;
  description: string;
  avatar?: File;
};

export type UpdateTrailParams = {
  trail_id: string;
  name: string;
  description: string;
};

export type UpdateAvatarTrailParams = {
  avatar: File;
  trail_id: string;
}

export type DeleteTrailParams = {
  trail_id: string;
}

export type CreatePlaylistParams = {
  name: string;
  description: string;
  trail_id: string;
}

export type ListAllByTrailParams = {
  trail_id: string;
}

export type AddTrailInUserParams = {
  trail_id: string;
}