import { history } from "src/root/App";
import React from "react";
import { css } from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Text } from "src/design/Text";
import { AnchoredMenu, MenuItem } from "src/design/AnchoredMenu";
import { Link } from "react-router-dom";
import {
  makeHomeRoute,
  composeRoutes,
  makePaletteCreatorRoute,
  makeNewRoute,
} from "src/root/root.routes";
import { styled } from "src/root/root.theme";
import { Icon } from "src/design/Icon";

const cssOverrides = {
  looks: css`
    color: #fff;
    margin-right: 8px;
  `,
};

const ToolbarBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;

  ${props => css`
    color: #ffffff;
  `}
`;

const menuItems: Array<MenuItem> = [
  {
    icon: "add",
    label: "CREATE",
    onClick: (e, cb) => {
      history.push(composeRoutes([makePaletteCreatorRoute(), makeNewRoute()]));
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

export const Header = (props: Props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <ToolbarBox>
          <StyledLink to={makeHomeRoute()}>
            <Icon iconName="looks" css={cssOverrides.looks} />
            <Text variant="h6" fontWeight={700}>
              Meld
            </Text>
          </StyledLink>
          <AnchoredMenu toggleIcon="dehaze" menuItems={menuItems} />
        </ToolbarBox>
      </Toolbar>
    </AppBar>
  );
};
