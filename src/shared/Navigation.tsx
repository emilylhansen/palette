import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";

const NavigationBox = styled.div`
  //   width: 100%;
  //   height: 32px;
  border: 1px solid;
`;

const MenuBox = styled.div`
  width: 96px;
  position: absolute;
  border: 1px solid;
  right: 16px;
`;

const MenuItemBox = styled.div`
  flex: 1;
  height: 32px;
  align-items: center;
  text-transform: uppercase;
`;

type MenuItem = { name: string; onClick: () => void };

const menuItems: Array<MenuItem> = [
  { name: "profile", onClick: () => null },
  { name: "settings", onClick: () => null },
  { name: "logout", onClick: () => null },
  { name: "create", onClick: () => null },
];

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const Navigation = ({}: Props) => {
  return (
    <NavigationBox>
      <i className="material-icons md-18">dehaze</i>
      <MenuBox>
        {menuItems.map(item => (
          <MenuItemBox onClick={item.onClick}>{item.name}</MenuItemBox>
        ))}
      </MenuBox>
    </NavigationBox>
  );
};
