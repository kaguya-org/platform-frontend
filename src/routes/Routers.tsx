import RouterDom, { 
  Route, 
  Navigate, 
  Routes,
  useMatch,
  BrowserRouter,
  Outlet
} from 'react-router-dom';

import { 
  Login,
  Register,
  User,
} from '@/pages';
import { useAuth } from '@/hooks';
import { Loading } from '@/components';

export type PrivateRouteProps = {
  redirect_to?: string;
}

export function PrivateRoute({
  redirect_to = '/login',
}: PrivateRouteProps) {
  const { tokenIsValid } = useAuth();
  
  if(!tokenIsValid) {
    return <Navigate to={redirect_to} />
  }
  
  // TODO - validate permission
  // {}

  return  <Outlet />
}

export function PublicRoute({
  redirect_to = '/user',
}: PrivateRouteProps) {
  const { tokenIsValid } = useAuth();
  
  if(tokenIsValid) {
    return <Navigate to={redirect_to} />
  }

  // TODO - validate permission
  // {}

  return  <Outlet />
}

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
        <Route element={<User.Dashboard />} path="user" />
        <Route element={<User.Trail />} path="/trail/:trail_name" />
        <Route element={<User.Playlist />} path="/trail/:trail_name/playlist/:playlist_name">
          <Route element={<User.Playlist />} path="block/:block_name/classe/:classe_name" />
        </Route>
      </Route>

      <Route element={<Navigate to={tokenIsValid ? '/user' : '/login'} />} path="*" />

      {/* Admin private */}
      {/* <Route element={<Admin.CreateTrail />} path="/admin" /> 
      <Route element={<Admin.Playlist />} path="/admin/playlist/:playlist_id" />

      <Route element={<Admin.Trail />} path="/admin/trail/:trail_id" />
      <Route element={<Admin.CreateTrail />} path="/admin/trail/create" /> */}

      {/* User */}
  {/* 
      <Route element={<User.Playlist />} path="/user/playlist/:playlist_id" />
      <Route element={<User.Trail />} path="/user/trail/:trail_id" />
      <Route element={<User.Playlist />} path="/user/trail/:trail_id/:playlist_id" /> */}


    </Routes>
  );
}
