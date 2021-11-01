import { AxiosError } from 'axios';

// global
type Role = {
  id: string;
  name: string;
  permission: number;
  created_at: string;
  updated_at: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  username: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  role: Role;
};

export type ApiErrorResponse = AxiosError & {
  response?: {
    data: {
      message: string;
      status: string;
      statusCode: number;
    }
  }
}

// auth
export type LoginResponse = {
  user: User,
  token: string;
}

// user
export type CreateUserResponse = {
  user: User;
  platform_user_roles: Array<{
    id: string;
    platform_role: {
      id: string;
      role: string | 'default';
      permision: number,
      created_at: string;
      updated_at: string;
    }
  }>
}

// admin
export type CreateTrailResponse = {
  id: string,
  name: string,
  description: string,
  avatar_url: null | string,
  created_at: string,
  updated_at: string;
}

export type UpdateTrailAvatarResponse = {
  id: string,
  name: string,
  description: string,
  avatar_url: null | string,
  created_at: string,
  updated_at: string;
}

export type ListAllTrailsResponse = {
  id: string;
  name: string;
  description: string;
  playlists: [];
  user_trails: [];
  avatar: string | null;
  avatar_url: string | null;
  created_at: string,
  updated_at: string;
};

export type ListAllPlaylistsByTrailResponse = {
  id: string;
  name: string;
  description: string;
  trail_id: string;
  avatar: string | null;
  avatar_url: string | null;
  created_at: string,
  updated_at: string;
};

export type CreatePlaylistResponse = {
  id: string;
  name: string;
  description: string;
  trail_id: string;
  avatar_url: string | null;
  created_at: string,
  updated_at: string;
};