import React, { ReactNode } from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { css } from "styled-components";
import {
  T12,
  T24,
} from "/Users/emilyhansen/Desktop/palette-app/src/design/Text";
import { Palette } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.types";
import { Icon } from "/Users/emilyhansen/Desktop/palette-app/src/design/Icon";
import { PaletteTemplate } from "/Users/emilyhansen/Desktop/palette-app/src/shared/PaletteTemplate";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const OverlayBox = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.95);
  justify-content: center;
  align-items: center;
  display: flex;
`;

const OverlayContentBox = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

type PassedProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const Overlay = ({ children, isOpen, onClose }: Props) => {
  return isOpen && <OverlayBox onClick={onClose}>{children}</OverlayBox>;
};
