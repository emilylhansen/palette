import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";
import { Icon } from "/Users/emilyhansen/Desktop/palette-app/src/design/Icon";

const NavigationBox = styled.div`
  //   width: 100%;
  //   height: 32px;
  border: 1px solid;
`;

const MenuBox = styled.div`
  width: 120px;
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
      <Icon iconName="dehaze" />
      <MenuBox>
        {menuItems.map(item => (
          <MenuItemBox onClick={item.onClick}>{item.name}</MenuItemBox>
        ))}
      </MenuBox>
    </NavigationBox>
  );
};
