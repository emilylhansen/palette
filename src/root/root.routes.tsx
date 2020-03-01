import React from "react";
// import { IndexRedirect } from "react-router";
import { Route, Switch } from "react-router-dom";
import { Protected } from "src/auth/Protected";
import { Container } from "src/App";
import { Homepage } from "src/homepage/Homepage";
import { PaletteCreator } from "src/paletteCreator/PaletteCreator";

export const makeHomeRoute = () => "/";
export const makeCreateRoute = () => "/create";
export const makeEditRoute = () => "/edit";
export const makeAboutRoute = () => "/about";
export const makeSettingsRoute = () => "/settings";

export const RootRoutes = () => {
  return (
    <Switch>
      <Route component={Container}>
        <Route path={makeHomeRoute()} exact component={Homepage} />
        <Protected path={makeCreateRoute()} component={PaletteCreator} />
        <Route path={makeEditRoute()} component={() => <div>edit</div>} />
        {/* <Route path={makeAboutRoute()} component={() => <T12>out</T12>} />
        <Route path={makeSettingsRoute()} component={() => <T12>out</T12>} /> */}
      </Route>
    </Switch>
  );
};
