import { Switch } from 'react-router-dom';
import { RouterCustom, RouterCustomProps } from './routerCustom';

// User routes
import { UserDashboard } from '../pages/user/UserDashboard';
import { UserTrail } from '../pages/user/UserTrail';
import { UserPlaylist } from '../pages/user/UserPlaylist';
import { UserProfile } from '../pages/user/UserProfile';

// Admin routes
import { AdminCreateTrail } from '../pages/admin/AdminCreateTrail';
import { AdminTrail } from '../pages/admin/AdminTrail';
import { AdminPlaylist } from '../pages/admin/AdminPlaylist';
import { AdminDashboard } from '../pages/admin/AdminDashboard';

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
        path="/admin"
        {...adminRepeatProps}
        component={AdminDashboard} 
      />
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

       {/* <RouterCustom 
        path="/admin" role={{
          permission: 1,
          name: 'sub-admin'
        }}
        exact
        component={AdminDashboard}
      >
        <RouterCustom path="/trail">
          <RouterCustom path="/create" component={AdminCreateTrail} />
          <RouterCustom path="/:trail_id" component={AdminTrail} />
          <RouterCustom path="/:playlist_id" component={AdminPlaylist} />
        </RouterCustom>
      </RouterCustom> */}
      
      {/* User */}
      <RouterCustom path="/profile" ifAuthenticated isPrivate exact component={UserProfile} />
      <RouterCustom path="/dashboard" ifAuthenticated isPrivate  exact component={UserDashboard} />
      <RouterCustom path="/trail/:trail_id" ifAuthenticated isPrivate exact component={UserTrail} />
      <RouterCustom path="/trail/:trail_id/:playlist_id" ifAuthenticated isPrivate exact component={UserPlaylist} />

      {/* Global */}
      <RouterCustom path="/login" ifLoggedNotEnter component={Login} />
      <RouterCustom path="/register" ifLoggedNotEnter component={Register} />
      <RouterCustom path="/" component={Home} exact/>
    
    </Switch>
  );
};