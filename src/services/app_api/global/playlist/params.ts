
export type ListAllPlaylistByTrailParams = {
  query?: {
    trail_id?: string;
  }
}

export type ShowPlaylistParams = {
  query?: {
    playlist_id?: string;
    name?: string;
    trail_id?: string;
  }
}