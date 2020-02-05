import React, { ReactNode } from "react";
import styled from "styled-components";

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
  z-index: 9999;
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
