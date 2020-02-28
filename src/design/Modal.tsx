import React, { ReactNode, useState, useEffect } from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { keyframes } from "styled-components";
import { PaletteOverviewCard } from "src/shared/PaletteOverviewCard";
import { PaletteTileCard } from "src/shared/PaletteTileCard";
import { range } from "fp-ts/lib/Array";
import { mockPalettes } from "src/shared/mockData";
import { Overlay } from "src/design/Overlay";
import { Icon } from "src/design/Icon";
import { Option, none, some, isSome, map } from "fp-ts/lib/Option";
import { Palette } from "src/shared/shared.types";
import { T12, T24 } from "src/design/Text";
import Button from "@material-ui/core/Button";
import { IconButton } from "./IconButton";
import { isNil } from "src/shared/shared.typeGuards";

const ModalBox = styled.div`
  width: 800px;
  height: 500px;
  border-radius: 3px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px;
  display: flex;
  flex-direction: column;
`;

const CloseBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 24px;
`;

const ContentBox = styled.div`
  flex: 1;
  display: flex;
`;

type PassedProps = {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const Modal = ({ children, isOpen: isOpen_, onClose }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(
    isNil(isOpen_) ? false : isOpen_
  );

  useEffect(() => {
    setIsOpen(isNil(isOpen_) ? false : isOpen_);
  }, [isOpen_]);

  const handleOnClose = () => {
    setIsOpen(false);
    !isNil(onClose) && onClose();
  };

  return (
    <Overlay isOpen={isOpen} onClose={handleOnClose}>
      <ModalBox
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <CloseBox>
          <IconButton iconName="close" onClick={handleOnClose} size="small" />
        </CloseBox>
        <ContentBox>{children}</ContentBox>
      </ModalBox>
    </Overlay>
  );
};
