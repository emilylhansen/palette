import React, { ReactNode } from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "src/root/root.reducer";
import { Router, BrowserRouter } from "react-router-dom";
import { RootRoutes } from "src/root/root.routes";
import { createBrowserHistory } from "history";
import { Header } from "src/shared/components/Header";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { middleware as reduxPackMiddleware } from "redux-pack";
import { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { styled, theme } from "src/root/root.theme";

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

declare global {
  interface Window {
    dataLayer: any;
  }
}

export const localStorage = window.localStorage;

export const history = createBrowserHistory();

const logger = createLogger();

let store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(logger, thunk, reduxPackMiddleware)
);

const connector = connect();

type PropsFromRedux = ConnectedProps<typeof connector>;
type ComponentProps = PropsFromRedux & { children: ReactNode };

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
