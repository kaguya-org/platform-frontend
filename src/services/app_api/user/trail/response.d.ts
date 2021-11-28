import {
  User
} from '../geral/response';

export type ListAllTrailsFromUserResponse = {
  id: string;
  trail: {
    id: string;
    name: string;
    description: string;
    avatar: string | null;
    avatar_url: string | null;
  },
  trail_percentage_completed: number;
  playlists_completed: number;
  playlists_amount: number;
  user: User;
}