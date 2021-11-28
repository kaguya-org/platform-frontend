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
  user_roles: Array<{
    role: Role;
  }>;
};

export type RegisterUserResponse = {
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

export type TokenValidResponse = {
  validated: boolean;
}

export type LoginResponse = {
  user: User;
  token: string;
}