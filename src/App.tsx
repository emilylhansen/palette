import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch, applyMiddleware } from "redux";
import { rootReducer } from "src/root/root.reducer";
import { RootState } from "src/root/root.types";
import styled from "styled-components";
import { Switch, Route, Router, BrowserRouter } from "react-router-dom";
import { RootRoutes } from "src/root/root.routes";
import { createBrowserHistory, Location } from "history";
import { Header } from "src/shared/Header";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

declare global {
  interface Window {
    dataLayer: any;
  }
}
export const history = createBrowserHistory();
const logger = createLogger();

const BodyBox = styled.div`
  flex: 1;
  overflow-y: scroll;
  display: flex;
`;

const ComponentBox = styled.div`
  width: 100%;
  height: 100%;
`;

let store = createStore(rootReducer, undefined, applyMiddleware(logger, thunk));

type ComponentProps = PropsFromRedux;

const Component = (props: ComponentProps) => <ComponentBox>hi</ComponentBox>;

const mapState = (state: RootState) => {
  return {};
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    add: () => dispatch({ type: "ADD" }),
  };
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

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
