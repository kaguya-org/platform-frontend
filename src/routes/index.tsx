import { Switch } from 'react-router-dom';
import { RouterCustom, RouterCustomProps } from './routerCustom';

// User routes
import { Dashboard as UserDashboard } from '../pages/user/Dashboard';
import { Trail as UserTrail } from '../pages/user/Trail';
import { Playlist as UserPlaylist } from '../pages/user/Playlist';

// Admin routes
import { CreateTrail as AdminCreateTrail } from '../pages/admin/CreateTrail';
import { Trail as AdminTrail } from '../pages/admin/Trail';
import { Playlist as AdminPlaylist } from '../pages/admin/Playlist';

// Global routes
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';

export function Routes() {
  const adminRepeatProps: RouterCustomProps = {
    role: {
      permission: 1,
      name: 'sub-admin'
    },
    exact: true,
    isPrivate: true,
  };
  
  return (
    <Switch>
      {/* Admin */}
      <RouterCustom 
        path="/admin/trail/create"
        {...adminRepeatProps}
        component={AdminCreateTrail} 
      />
      <RouterCustom 
        path="/admin/trail/:trail_id"
        {...adminRepeatProps}
        component={AdminTrail} 
      />
      <RouterCustom 
        path="/admin/playlist/:playlist_id"
        {...adminRepeatProps}
        component={AdminPlaylist} 
      />

      {/* User */}
      <RouterCustom path="/dashboard" ifAuthenticated isPrivate exact component={UserDashboard} />
      <RouterCustom path="/trail/:trail_id" ifAuthenticated isPrivate exact component={UserTrail} />
      <RouterCustom path="/trail/:trail_id/:playlist_id" ifAuthenticated isPrivate exact component={UserPlaylist} />

      {/* Global */}
      <RouterCustom path="/login" ifLoggedNotEnter component={Login} />
      <RouterCustom path="/register" ifLoggedNotEnter component={Register} />
      <RouterCustom path="/" component={Home} exact/>
    
    </Switch>
  );
};