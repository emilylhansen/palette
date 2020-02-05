/** https://material-ui.com/components/app-bar/ */
import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";
import { Navigation } from "/Users/emilyhansen/Desktop/palette-app/src/shared/Navigation";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { AnchoredMenu } from "/Users/emilyhansen/Desktop/palette-app/src/design/AnchoredMenu";

const HeaderBox = styled.div`
  height: 32px;
  border: 1px solid;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  align-items: center;
`;

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

export const Header = ({}: Props) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        <AnchoredMenu />
      </Toolbar>
    </AppBar>
  );
};
