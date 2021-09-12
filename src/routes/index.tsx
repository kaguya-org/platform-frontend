import { Switch } from 'react-router-dom';
import { RouterCustom } from './routerCustom';

import { UserDashboard } from '../pages/user/UserDashboard';
import { UserTrail } from '../pages/user/UserTrail';
import { UserPlaylist } from '../pages/user/UserPlaylist';

export function Routes() {
  return (
    <Switch>
      {/* User */}
      <RouterCustom path="/dashboard" exact component={UserDashboard} />
      <RouterCustom path="/:trail_name" exact component={UserTrail} />
      <RouterCustom path="/:trail_name/:playlist_id" exact component={UserPlaylist} />

      {/* Admin */}
    </Switch>
  );
};