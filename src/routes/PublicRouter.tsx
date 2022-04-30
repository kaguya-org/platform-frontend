import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks';

export type PublicRouteProps = {
  redirect_to?: string;
}

export function PublicRoute({
  redirect_to = '/dashboard',
}: PublicRouteProps) {
  const { tokenIsValid } = useAuth();
  
  if(tokenIsValid) {
    return <Navigate to={redirect_to} />
  }

  // TODO - validate permission
  // {}

  return  <Outlet />
}
