import React from "react";
import { Redirect } from "react-router";
import { Route, Switch } from "react-router-dom";
import { Container } from "src/root/App";
import { HomepageLoader } from "src/homepage/HomepageLoader";
import { PaletteCreatorLoader } from "src/paletteCreator/PaletteCreatorLoader";

export const makeHomeRoute = () => "/";
export const makePaletteCreatorRoute = () => "/palette-creator";
export const makeNewRoute = () => "/new";
export const makeEditRoute = () => "/:palette-key";
export const makeAboutRoute = () => "/about";
export const makeSettingsRoute = () => "/settings";

export const composeRoutes = (routes: Array<string>) => routes.join("");

export const RootRoutes = () => {
  return (
    <Route component={Container}>
      <Switch>
        <Route
          exact
          path={composeRoutes([makePaletteCreatorRoute(), makeNewRoute()])}
          component={() => <PaletteCreatorLoader />}
        />
        <Route
          path="/palette-creator/:id"
          component={() => <PaletteCreatorLoader />}
        />
        <Route path="/" exact component={HomepageLoader} />
        <Redirect from="*" to="/" />
      </Switch>
    </Route>
  );
};
