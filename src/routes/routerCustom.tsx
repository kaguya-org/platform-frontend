import { useCallback, useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type RouterCustomProps = RouteProps & {
  isPrivate?: boolean;
  isAdmin?: boolean;
  ifAuthenticated?: boolean;
};

export function RouterCustom({isPrivate, ifAuthenticated, isAdmin, ...rest}: RouterCustomProps) {
  const { token } = useAuth();
  
  useCallback(() => {
    if(isAdmin && !token || !token && ifAuthenticated) {
      return <Redirect to="/" />;
    }
  }, [isAdmin, token, ifAuthenticated]);

  return (
    <Route {...rest} />
  )
}