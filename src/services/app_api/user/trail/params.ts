export type Filters = {
  take?: number;
  skip?: number;
}
export type listTrailsFromUserParams = {} & Filters;

export type AddTrailInUserParams = {
  trail_id: string;
}

export type RemoveTrailInUserParams = {
  trail_id: string;
}