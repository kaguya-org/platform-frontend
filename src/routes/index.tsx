import { Switch } from 'react-router-dom';
import { RouterCustom } from './routerCustom';

// User routes
import { UserDashboard } from '../pages/user/UserDashboard';
import { UserTrail } from '../pages/user/UserTrail';
import { UserPlaylist } from '../pages/user/UserPlaylist';

// Admin routes
import { AdminCreateTrail } from '../pages/admin/AdminCreateTrail';
import { AdminTrail } from '../pages/admin/AdminTrail';
import { AdminPlaylist } from '../pages/admin/AdminPlaylist';

// Global routes
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';

export function Routes() {
  return (
    <Switch>
      {/* Admin */}
      {/* <RouterCustom path="/admin" exact /> */}

      <RouterCustom path="/admin/trail/create" isAdmin exact component={AdminCreateTrail} />
      <RouterCustom path="/admin/trail/:trail_id" isAdmin exact component={AdminTrail} />
      <RouterCustom path="/admin/trail/:trail_id/playlist" isAdmin exact component={AdminPlaylist} />
      
      {/* User */}
      <RouterCustom path="/dashboard" ifAuthenticated exact component={UserDashboard} />
      <RouterCustom path="/trail/:trail_name" ifAuthenticated exact component={UserTrail} />
      <RouterCustom path="/trail/:trail_name/:playlist_id" ifAuthenticated exact component={UserPlaylist} />

      {/* Global */}
      <RouterCustom path="/login" component={Login} />
      <RouterCustom path="/register" component={Register} />
      <RouterCustom path="/" component={Home} exact/>
    
    </Switch>
  );
};