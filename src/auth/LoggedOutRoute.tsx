import React from "react";
import styled from "styled-components";
import { Route, RouteProps, RouteComponentProps } from "react-router-dom";

const LoggedOutRouteBox = styled.div``;

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps & RouteProps;

export const LoggedOutRoute = ({ component: Component }: Props) => {
  return (
    <LoggedOutRouteBox>
      <Route
        render={(routeProps: RouteComponentProps) => (
          <Component {...routeProps} />
        )}
      />
    </LoggedOutRouteBox>
  );
};
