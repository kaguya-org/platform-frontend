
export type ListAllPlaylistByTrailParams = {
  query?: {
    trail_id?: string;
  }
}

export type ShowPlaylistParams = {
  query?: {
    playlist_id?: string;
    playlist_slug?: string;
    trail_slug?: string;
  }
}