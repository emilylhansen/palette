import React from "react";
// import { IndexRedirect } from "react-router";
import { Route, Switch } from "react-router-dom";
import { Protected } from "src/auth/Protected";
import { Container } from "src/App";
import { T12 } from "src/design/Text";
import { Homepage } from "src/homepage/Homepage";
import { PaletteCreator } from "src/paletteCreator/PaletteCreator";

export const makeHomeRoute = () => "/home";
export const makeCreateRoute = () => "/create";
export const makeEditRoute = () => "/edit";
export const makeAboutRoute = () => "/about";
export const makeSettingsRoute = () => "/settings";

export const RootRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Container} />
      <Route path={makeHomeRoute()} exact component={Homepage} />
      <Protected path={makeCreateRoute()} exact component={PaletteCreator} />
      <Route path={makeEditRoute()} exact component={() => <div>edit</div>} />
      <Route
        path={makeAboutRoute()}
        exact={true}
        component={() => <T12>out</T12>}
      />
      <Route
        path={makeSettingsRoute()}
        exact={true}
        component={() => <T12>out</T12>}
      />
    </Switch>
  );
};
