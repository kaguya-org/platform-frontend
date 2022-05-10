export type Trail = {
  id: string;
  name: string;
  description: string;
  avatar: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type TrailsResponse = {
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
