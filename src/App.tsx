import React, { ReactNode } from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch, applyMiddleware } from "redux";
import { rootReducer } from "src/root/root.reducer";
import { RootState } from "src/root/root.types";
import styled from "styled-components";
import { Switch, Route, Router, BrowserRouter } from "react-router-dom";
import { RootRoutes } from "src/root/root.routes";
import { createBrowserHistory, Location } from "history";
import { Header } from "src/shared/components/Header";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { middleware as reduxPackMiddleware } from "redux-pack";

declare global {
  interface Window {
    dataLayer: any;
  }
}
export const history = createBrowserHistory();
const logger = createLogger();

export const localStorage = window.localStorage;

const BodyBox = styled.div`
  flex: 1;
  overflow-y: scroll;
  display: flex;
`;

const ComponentBox = styled.div`
  width: 100%;
  height: 100%;
`;

let store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(logger, thunk, reduxPackMiddleware)
);

const connector = connect();

type ComponentProps = PropsFromRedux & { children: ReactNode };

type PropsFromRedux = ConnectedProps<typeof connector>;

const Component = (props: ComponentProps) => (
  <ComponentBox>{props.children}</ComponentBox>
);

export const Container = connector(Component);

export const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <BodyBox>
          <RootRoutes />
        </BodyBox>
      </Router>
    </Provider>
  </BrowserRouter>
);
