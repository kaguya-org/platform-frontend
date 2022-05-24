
export type ListAllPlaylistsByTrailResponse = {
  id: string;
  name: string;
  slug: string;
  description: string;
  trail_id: string;
  avatar: string | null;
  avatar_url: string | null;
  created_at: string,
  updated_at: string;
};

export type ShowPlaylistResponse = {
  id: string;
  name: string;
  slug: string;
  description: string;
  trail_id: string;
  avatar: null | string;
  avatar_url: null | string;
  created_at: string;
  updated_at: string;
}