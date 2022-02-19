import { 
  Trail,
} from '../../global/types';
import {
  User
} from '../geral/response';

export type ListAllTrailsFromUserResponse = {
  id: string;
  trail: Trail;
  progress: number;
  user: User;
  created_at: string;
  updated_at: string;
}