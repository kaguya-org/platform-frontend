export type CreateTrailParams = {
  name: string;
  description: string;
  avatar?: File;
};

export type UpdateTrailParams = {
  trail_id: string;
  name?: string;
  description?: string;
};

export type UpdateAvatarTrailParams = {
  avatar: File;
  trail_id: string;
}

export type DeleteTrailParams = {
  trail_id: string;
}