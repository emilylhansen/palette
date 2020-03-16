import React, { ReactNode } from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch, applyMiddleware } from "redux";
import { rootReducer } from "src/root/root.reducer";
import { RootState } from "src/root/root.types";
import { Switch, Route, Router, BrowserRouter } from "react-router-dom";
import { RootRoutes } from "src/root/root.routes";
import { createBrowserHistory, Location } from "history";
import { Header } from "src/shared/components/Header";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { middleware as reduxPackMiddleware } from "redux-pack";
import baseStyled, {
  ThemeProvider,
  css,
  ThemedStyledInterface,
} from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import {
  MuiThemeProvider,
  createMuiTheme,
  Theme as MuiTheme,
} from "@material-ui/core/styles";
import { styled, mainTheme, muiTheme, theme } from "src/root/root.theme";

declare global {
  interface Window {
    dataLayer: any;
  }
}
export const history = createBrowserHistory();
const logger = createLogger();

export const localStorage = window.localStorage;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

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
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme.mui}>
            <ThemeProvider theme={theme}>
              <ContentBox>
                <Header />
                <BodyBox>
                  <RootRoutes />
                </BodyBox>
              </ContentBox>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </Router>
    </Provider>
  </BrowserRouter>
);
