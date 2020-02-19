import {
  Route,
  RouteProps,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import { isAuthenticated as isAuthenticatedSelector } from "src/auth/auth.selectors";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "src/root/root.types";
import { makeHomeRoute } from "src/root/root.routes";

type PassedProps = {};
type InjectedProps = {
  isAuthenticated: boolean;
};
type Props = PassedProps & InjectedProps & RouteProps;

const Protected = ({
  isAuthenticated,
  component: Component,
  ...otherProps
}: Props) => {
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

const mapState = (state: RootState) => {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {};
};

const connector = connect(mapState, mapDispatch)(Protected);
export { connector as Protected };
