export type Trail = {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatar: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type TrailsResponse = {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatar: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  user_trail?: {
    progress: number;
    enabled: boolean;
  } | null
  _count: {
    playlists: number;
    users: number;
    lessons: number;  
  };
};
