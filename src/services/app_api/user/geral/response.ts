type Role = {
  id: string;
  name: string;
  permission: number;
  created_at: string;
  updated_at: string;
}

export type User = {
  id: string;
  name: string | null;
  email: string;
  avatar: string | null;
  avatar_url: string | null;
  username: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  user_roles: Array<{
    id: string;
    created_at: string;
    updated_at: string;
    role: Role;
  }>;
};

export type RegisterUserResponse = {
  user: User;
}

export type TokenValidResponse = {
  validated: boolean;
}

export type LoginResponse = {
  user: User;
  token: string;
}