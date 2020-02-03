import React from "react";
// import { IndexRedirect } from "react-router";
import { Route, Switch } from "react-router-dom";
import { LoggedInRoute } from "/Users/emilyhansen/Desktop/palette-app/src/auth/LoggedInRoute";
import { LoggedOutRoute } from "/Users/emilyhansen/Desktop/palette-app/src/auth/LoggedOutRoute";
import { Container } from "/Users/emilyhansen/Desktop/palette-app/src/App";
import { T12 } from "/Users/emilyhansen/Desktop/palette-app/src/design/Text";
import { Homepage } from "/Users/emilyhansen/Desktop/palette-app/src/homepage/Homepage";

export const RootRoutes = () => {
  return (
    <Switch>
      {/* <IndexRedirect to="/" /> */}
      <LoggedInRoute path="/" exact={true} component={Container} />
      <LoggedInRoute path="/home" exact={true} component={Homepage} />
      <LoggedOutRoute
        path="/about"
        exact={true}
        component={() => <T12>out</T12>}
      />
      <Route component={() => <div>nope</div>} />
    </Switch>
  );
};
