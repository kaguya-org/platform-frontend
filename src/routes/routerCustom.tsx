import { useCallback, useEffect, useMemo } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';

export type RouterCustomProps = RouteProps & {
  isPrivate?: boolean;
  role?: {
    name?: string;
    permission: number;
  };
  ifAuthenticated?: boolean;
  ifLoggedNotEnter?: boolean;
};

export function RouterCustom({
  isPrivate, 
  ifAuthenticated,
  ifLoggedNotEnter,
  role = {name: 'default', permission: 2}, 
  ...rest
}: RouterCustomProps) {
  const { token, tokenIsValid, signOut, user } = useAuth();

  if(isPrivate && !tokenIsValid) {
    signOut();
    return <Redirect to="/login" />;
  }

  if(ifLoggedNotEnter && tokenIsValid && token) {
    const hasPermissionToRedirect = user?.user_roles.some(user_role => {
      user_role.role.permission <= 1
    });

    if(hasPermissionToRedirect) {
      return <Redirect to="/admin/trail/create" />;
    } else {
      return <Redirect to="/dashboard" />;
    }
  }
  
  const hasPermission = user?.user_roles.some((user_role) => role.permission >= user_role.role.permission);

  const permissionPromise = Promise.resolve(hasPermission);
  
  permissionPromise.then(response => {
    if(!hasPermission && isPrivate) {
      if(tokenIsValid && token) {
        return <Redirect to="/dashboard" />;
      }
      
      return <Redirect to="/" />
    } 
  });

  return (
    <Route {...rest} />
  )
}
