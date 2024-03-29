import { 
  Trail,
} from '../../global/types';
import {
  User
} from '../geral/response';

export type UserTrail = {
  progress: number;
  enabled: boolean;
}

export type ListTrailFromUserResponse = {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatar: string | null;
  avatar_url: string | null;

  created_at: string;
  updated_at: string;

  _count: {
    playlists: number;
    users: number;
    lessons: number;
  };

  user_trail: UserTrail;
}