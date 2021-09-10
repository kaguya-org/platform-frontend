import { Switch } from 'react-router-dom';

import { UserDashboard } from '../pages/UserDashboard';
import {UserTrail} from '../pages/UserTrail';
import { RouterCustom } from './routerCustom';

export function Routes() {
  return (
    <Switch>
      {/* User */}
      <RouterCustom path="/dashboard" component={UserDashboard} />
      <RouterCustom path="/:trail_name" component={UserTrail} />

      {/* Admin */}
    </Switch>
  );
};