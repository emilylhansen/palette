import React from "react";
import { Redirect } from "react-router";
import { Route, Switch } from "react-router-dom";
import { Protected } from "src/auth/Protected";
import { Container } from "src/App";
import { Homepage } from "src/homepage/Homepage";
import { PaletteCreator } from "src/paletteCreator/PaletteCreator";
import { PaletteCreatorLoader } from "src/paletteCreator/PaletteCreatorLoader";
import { mockPaletteIds } from "src/shared/mockData";

export const makeHomeRoute = () => "/";
export const makePaletteCreatorRoute = () => "/palette-creator";
export const makeNewRoute = () => "/new";
export const makeEditRoute = () => "/:palette-key";
export const makeAboutRoute = () => "/about";
export const makeSettingsRoute = () => "/settings";

export const composeRoutes = (routes: Array<string>) => routes.join("");

export const RootRoutes = () => {
  console.log({
    new: composeRoutes([makePaletteCreatorRoute(), makeNewRoute()]),
    edit: composeRoutes([makePaletteCreatorRoute(), makeEditRoute()]),
  });
  return (
    <Route component={Container}>
      <Switch>
        <Route
          exact
          path="/palette-creator/new"
          component={() => <PaletteCreatorLoader />}
        />
        <Route
          path="/palette-creator/:id"
          component={() => <PaletteCreatorLoader />}
        />
        <Route path="/" exact component={Homepage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Route>
  );
};
