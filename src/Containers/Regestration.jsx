import React from "react";
import Register from "./../Layouts/Register";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./../Pages/Login";
import ChangePassword from "./../Pages/ChangePassword";
import { Redirect } from "react-router-dom";

const Regestration = (props) => {
  return (
    <>
      <Register>
        <Switch>
          <Route
            exact
            path="/auth"
            render={() => <Redirect to="/auth/login" />}
          />
          <Route path="/auth/login" component={Login} />
          {/* <Route path="/auth/getcode" component={ChangePassword} /> */}
          <Route path="*" render={() => <Redirect to="/auth" />} />
        </Switch>
      </Register>
    </>
  );
};

export default Regestration;
