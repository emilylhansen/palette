/** https://material-ui.com/components/app-bar/ */
import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {
  AnchoredMenu,
  MenuItem,
} from "/Users/emilyhansen/Desktop/palette-app/src/design/AnchoredMenu";

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

const menuItems: Array<MenuItem> = [
  {
    icon: "add",
    label: "create",
    onClick: () => null,
  },
  {
    icon: "person",
    label: "profile",
    onClick: () => null,
  },
  {
    icon: "menu_book",
    label: "about",
    onClick: () => null,
  },
  {
    icon: "settings",
    label: "settings",
    onClick: () => null,
  },
  {
    icon: "power_settings_new",
    label: "logout",
    onClick: () => null,
  },
];

export const Header = ({}: Props) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        <AnchoredMenu toggleIcon="dehaze" menuItems={menuItems} />
      </Toolbar>
    </AppBar>
  );
};
