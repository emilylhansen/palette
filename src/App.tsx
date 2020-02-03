import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import { rootReducer } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.reducer";
import { RootState } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.types";
import styled from "styled-components";
import { Route, Router } from "react-router-dom";
import { RootRoutes } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.routes";
import { createBrowserHistory, Location } from "history";

declare global {
  interface Window {
    dataLayer: any;
  }
}
const history = createBrowserHistory();

const ComponentBox = styled.div`
  width: 100%;
  height: 100%;
`;

let store = createStore(rootReducer);

type ComponentProps = PropsFromRedux;

const Component = (props: ComponentProps) => (
  <ComponentBox onClick={props.add}>
    Helloworld React & Redux! {props.count}
  </ComponentBox>
);

const mapState = (state: RootState) => {
  return {
    count: state.auth.count,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    add: () => dispatch({ type: "ADD" }),
  };
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Container = connector(Component);

export const App = () => (
  <Router history={history}>
    <Provider store={store}>
      <Container />
      <Route component={RootRoutes} />
    </Provider>
  </Router>
);
