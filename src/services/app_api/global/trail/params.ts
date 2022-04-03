
export type ListTrailParams = {
  order?: 'desc' | 'asc';
  exclude_my_trails?: boolean;
  take?: number;
  skip?: number;
}

export type ShowTrailParams = {
  query?: {
    trail_id?: string;
    name?: string;
  }
}
