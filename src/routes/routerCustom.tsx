import { Redirect, Route, RouteProps } from 'react-router-dom';

type RouterCustomProps = RouteProps & {
  isPrivate?: boolean;
  isAuthenticated?: boolean;
};

export function RouterCustom({isPrivate, isAuthenticated, ...rest}: RouterCustomProps) {
  return (
    <Route {...rest} />
  )
}