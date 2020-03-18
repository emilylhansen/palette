import Button from "@material-ui/core/Button";
import { default as MUIModal } from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { range } from "fp-ts/lib/Array";
import { isSome, map, none, Option, some } from "fp-ts/lib/Option";
import React, { ReactNode, useEffect, useState } from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import { Icon } from "src/design/Icon";
import { Overlay } from "src/design/Overlay";
import { Text } from "src/design/Text";
import { Theme } from "src/root/root.theme";
import { PaletteOverviewCard } from "src/shared/components/PaletteOverviewCard";
import { PaletteTileCard } from "src/shared/components/PaletteTileCard";
import { mockPalettes } from "src/shared/mockData";
import { isNil } from "src/shared/shared.typeGuards";
import { Palette } from "src/shared/shared.types";
import styled, { keyframes } from "styled-components";

import { IconButton } from "./IconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 800,
      height: 500,
      backgroundColor: "#FFF",
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 10px",
      outline: 0,
      display: "flex",
      flexDirection: "column",
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%)`,
    },
    modalRoot: {
      backgroundColor: "red",
    },
  })
);

const CloseBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 24px;
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

  const classes = useStyles();
  console.log(classes.modalRoot);

  return (
    <MUIModal
      open={isOpen}
      onClose={handleOnClose}
      // BackdropProps={{
      //   classes: {
      //     root: classes.modalRoot,
      //   },
      // }}
    >
      <Paper className={classes.paper}>
        <CloseBox>
          <IconButton iconName="close" onClick={handleOnClose} size="small" />
        </CloseBox>
        {children}
      </Paper>
    </MUIModal>
  );
};
