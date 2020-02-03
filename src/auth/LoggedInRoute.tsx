import React from "react";
import styled from "styled-components";
import { Route, RouteProps, RouteComponentProps } from "react-router-dom";

const LoggedInRouteBox = styled.div``;

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps & RouteProps;

export const LoggedInRoute = ({ component: Component }: Props) => {
  return (
    <LoggedInRouteBox>
      <Route
        render={(routeProps: RouteComponentProps) => (
          <Component {...routeProps} />
        )}
      />
    </LoggedInRouteBox>
  );
};
