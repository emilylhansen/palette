import React, { ReactNode } from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch, applyMiddleware } from "redux";
import { rootReducer } from "src/root/root.reducer";
import { RootState } from "src/root/root.types";
import baseStyled, { ThemedStyledInterface } from "styled-components";
import { Switch, Route, Router, BrowserRouter } from "react-router-dom";
import { RootRoutes } from "src/root/root.routes";
import { createBrowserHistory, Location } from "history";
import { Header } from "src/shared/components/Header";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { middleware as reduxPackMiddleware } from "redux-pack";
import styled, { ThemeProvider, css } from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#77a6f7",
      dark: "#5374ac",
      light: "#92b7f8",
    },
    secondary: {
      main: "#008874",
      dark: "#005f51",
      light: "#339f8f",
    },
    // error: { main: "#f13c20" },
    // warning: { main: "#f13c20" },
    info: {
      main: "#f13c20",
      dark: "#a82a16",
      light: "#f3634c",
    },
    // success: { main: "#f13c20" },
  },
  typography: {
    fontFamily: '"Montserrat" ,sans-serif',
  },
});

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
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <Header />
              <BodyBox>
                <RootRoutes />
              </BodyBox>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </Router>
    </Provider>
  </BrowserRouter>
);
