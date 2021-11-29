
export type ListAllTrailParams = {
  order?: 'desc' | 'asc';
  exclude_my_trails?: boolean;
  take?: number;
  skip?: number;
}

export type ShowTrailParams = {
  trail_id: string;
}
