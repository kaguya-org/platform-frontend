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
        <Route element={<User.Trail />} path="/trail/:trail_name" />
        <Route element={<User.Playlist />} path="/trail/:trail_name/playlist/:playlist_name">
          <Route element={<User.Playlist />} path="block/:block_name/classe/:classe_name" />
        </Route>
      </Route>

      <Route element={<Navigate to={tokenIsValid ? '/dashboard' : '/login'} />} path="*" />
    </Routes>
  );
}
