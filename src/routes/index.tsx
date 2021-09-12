import { Switch } from 'react-router-dom';
import { RouterCustom } from './routerCustom';

import { UserDashboard } from '../pages/UserDashboard';
import { UserTrail } from '../pages/UserTrail';
import { UserPlaylist } from '../pages/UserPlaylist';

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