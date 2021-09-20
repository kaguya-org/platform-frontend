import { Switch } from 'react-router-dom';
import { RouterCustom } from './routerCustom';

// User routes
import { UserDashboard } from '../pages/user/UserDashboard';
import { UserTrail } from '../pages/user/UserTrail';
import { UserPlaylist } from '../pages/user/UserPlaylist';

// Admin routes
import { AdminCreateTrail } from '../pages/admin/AdminCreateTrail';

export function Routes() {
  return (
    <Switch>
      {/* Admin */}
      <RouterCustom path="/admin" exact>

      </RouterCustom>
        <RouterCustom path="/admin/trail/create" component={AdminCreateTrail} />
      {/* User */}
      <RouterCustom path="/dashboard" exact component={UserDashboard} />
      <RouterCustom path="/:trail_name" exact component={UserTrail} />
      <RouterCustom path="/:trail_name/:playlist_id" exact component={UserPlaylist} />
    </Switch>
  );
};