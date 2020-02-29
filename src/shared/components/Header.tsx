/** https://material-ui.com/components/app-bar/ */
import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { css } from "styled-components";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { AnchoredMenu, MenuItem } from "src/design/AnchoredMenu";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import {
  makeHomeRoute,
  makeAboutRoute,
  makeCreateRoute,
  makeEditRoute,
  makeSettingsRoute,
} from "src/root/root.routes";
import { history } from "src/App";

const ToolbarBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
`;

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

const menuItems: Array<MenuItem> = [
  {
    icon: "add",
    label: "create",
    onClick: (e, cb) => {
      history.push(makeCreateRoute());
      cb();
    },
  },
  // {
  //   icon: "person",
  //   label: "profile",
  //   onClick: (e, cb) => {
  //     history.push(makeCreateRoute());
  //     cb();
  //   },
  // },
  // {
  //   icon: "menu_book",
  //   label: "about",
  //   onClick: (e, cb) => {
  //     history.push(makeAboutRoute());
  //     cb();
  //   },
  // },
  // {
  //   icon: "settings",
  //   label: "settings",
  //   onClick: (e, cb) => {
  //     history.push(makeSettingsRoute());
  //     cb();
  //   },
  // },
  {
    icon: "power_settings_new",
    label: "logout",
    onClick: (e, cb) => {
      history.push(makeCreateRoute());
      cb();
    },
  },
];

export const Header = ({}: Props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <ToolbarBox>
          <Link to={makeHomeRoute()}>
            <Typography variant="h6">Palette App</Typography>
          </Link>
          <AnchoredMenu toggleIcon="dehaze" menuItems={menuItems} />
        </ToolbarBox>
      </Toolbar>
    </AppBar>
  );
};
