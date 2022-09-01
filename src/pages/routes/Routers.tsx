  import { 
  Route, 
  Navigate, 
  Routes,
} from 'react-router-dom';

import { useAuth } from '@/hooks';

import { PublicRoute } from './PublicRouter';
import { PrivateRoute } from './PrivateRouter';

import { 
  Login,
  Register,
  User,
} from '@/pages';
import { Profile } from '../user/Profile';

export function Routers() {
  const { tokenIsValid } = useAuth();
 
  return (
    <Routes>
      {/* Publics */}
      <Route element={<PublicRoute />}>
        <Route element={<Login />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Route>

      {/* Users private */}
      <Route element={<PrivateRoute />}>
        <Route element={<User.Dashboard />} path="/dashboard" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<User.Trail />} path="/trail/:trail_slug" />
        <Route element={<User.Playlist />} path="/trail/:trail_slug/playlist/:playlist_slug">
          <Route element={<User.Playlist />} path="block/:block_slug/lesson/:lesson_slug" />
        </Route>
      </Route>

      <Route element={<Navigate to={tokenIsValid ? '/dashboard' : '/login'} />} path="*" />
    </Routes>
  );
}
