import React from "react";
import { Route, Switch } from "react-router-dom";
import { LoggedInRoute } from "/Users/emilyhansen/Desktop/palette-app/src/auth/LoggedInRoute";
import { LoggedOutRoute } from "/Users/emilyhansen/Desktop/palette-app/src/auth/LoggedOutRoute";

export const RootRoutes = () => {
  return (
    <Switch>
      <LoggedInRoute path="/" exact={true} component={() => <div>in</div>} />
      <LoggedOutRoute
        path="/about"
        exact={true}
        component={() => <div>out</div>}
      />
      <Route component={() => <div>nope</div>} />
    </Switch>
  );
};
