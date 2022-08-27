
import { Cover } from '@/components/Cover';
import { useAuth } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';

export type PrivateRouteProps = {
  redirect_to?: string;
}

export function PrivateRoute({
  redirect_to = '/login',
}: PrivateRouteProps) {
  const { tokenIsValid, loading_page } = useAuth();

  if(loading_page) {
    return (
      <Cover
        addStyleDefault={true}
        hasLoading={loading_page}
      />
    )
  }
  
  if(!tokenIsValid) {
    return <Navigate to={redirect_to} />
  }
  
  // TODO - validate permission
  // {}

  return  <Outlet />
}