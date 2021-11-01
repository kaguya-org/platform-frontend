import { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';

type RouterCustomProps = RouteProps & {
  isPrivate?: boolean;
  isAdmin?: boolean;
  ifAuthenticated?: boolean;
};

export function RouterCustom({isPrivate, ifAuthenticated, isAdmin, ...rest}: RouterCustomProps) {
  const { token, signOut } = useAuth();

  useEffect(() => {
    api.user.token.validate().then(response => {
      if(!response.data.validated && isPrivate) {
        signOut();
        return
      }
    });
  }, []);
  
    if(isAdmin && !token || !token && ifAuthenticated) {
      return <Redirect to="/" />;
    }

  return (
    <Route {...rest} />
  )
}