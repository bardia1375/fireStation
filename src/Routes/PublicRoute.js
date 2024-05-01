import React from "react";
import { Route, Redirect } from "react-router-dom";
const PublicRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        rest.isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/mydevice",
            }}
          />
        ) : (
          React.createElement(component, props)
        )
      }
    />
  );
};

export default PublicRoute;
