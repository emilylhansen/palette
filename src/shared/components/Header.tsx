/** https://material-ui.com/components/app-bar/ */
import { history } from "src/root/App";
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
  makeEditRoute,
  makeSettingsRoute,
  composeRoutes,
  makePaletteCreatorRoute,
} from "src/root/root.routes";

const ToolbarBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  ${props => css`
    color: ${props.theme.palette.secondary.main};
  `}
`;

const menuItems: Array<MenuItem> = [
  {
    icon: "add",
    label: "create",
    onClick: (e, cb) => {
      history.push(makePaletteCreatorRoute());
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
  // {
  //   icon: "power_settings_new",
  //   label: "logout",
  //   onClick: (e, cb) => {
  //     history.push(makeCreateRoute());
  //     cb();
  //   },
  // },
];

type Props = {};

export const Header = ({}: Props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <ToolbarBox>
          <StyledLink to={makeHomeRoute()}>
            <Typography variant="h6">Palette App</Typography>
          </StyledLink>
          <AnchoredMenu toggleIcon="dehaze" menuItems={menuItems} />
        </ToolbarBox>
      </Toolbar>
    </AppBar>
  );
};
