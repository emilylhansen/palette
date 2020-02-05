import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import { rootReducer } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.reducer";
import { RootState } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.types";
import styled from "styled-components";
import { Switch, Route, Router, BrowserRouter } from "react-router-dom";
import { RootRoutes } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.routes";
import { createBrowserHistory, Location } from "history";
import { Header } from "/Users/emilyhansen/Desktop/palette-app/src/shared/Header";

declare global {
  interface Window {
    dataLayer: any;
  }
}
const history = createBrowserHistory();

const BodyBox = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const ComponentBox = styled.div`
  width: 100%;
  height: 100%;
`;

let store = createStore(rootReducer);

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
  <Provider store={store}>
    {/* <Router history={history}> */}
    <Header />
    <BodyBox>
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>
    </BodyBox>
  </Provider>
);
