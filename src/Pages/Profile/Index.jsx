import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import ChangePassword from './ChangePassword';
import Profile from './Profile';

function ProfileIndex() {
    let match = useRouteMatch();
    return (
      <>
        <Switch>
        <Route exact path={`${match.path}`}>
          <Profile/>
        </Route>
          <Route exact path={`${match.path}/changepass`}>
            <ChangePassword/>
          </Route>
        </Switch>
      </>
    );
}

export default ProfileIndex