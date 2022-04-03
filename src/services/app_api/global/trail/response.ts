export type Trail = {
  id: string;
  name: string;
  description: string;
  avatar: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type ListTrailsResponse = {
  id: string;
  name: string;
  description: string;
  avatar: string | null;
  created_at: string;
  updated_at: string;
  _count: {
    playlists: number;
    users: number;
    classes: number;  
  };
};

export type ShowTrailResponse = {
  id: string;
  name: string;
  description: string;
  avatar_url: null | string;
  created_at: string;
  updated_at: string;
  _count: {
    playlists: number;
    users: number;
    classes: number;  
  };
}
