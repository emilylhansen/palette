import React from "react";
import { useSelector } from "react-redux";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { isAuthenticated as isAuthenticatedSelector } from "src/auth/auth.selectors";
import { makeHomeRoute } from "src/root/root.routes";

type Props = {} & RouteProps;

export const Protected = ({ component: Component, ...otherProps }: Props) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  return isAuthenticated ? (
    <Route
      {...otherProps}
      render={(routeProps: RouteComponentProps) => (
        <Component {...routeProps} />
      )}
    />
  ) : (
    <Redirect to={makeHomeRoute()} />
  );
};
