import { default as MUIModal } from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { ReactNode, useEffect, useState } from "react";
import { IconButton } from "src/design/IconButton";
import { Medias } from "src/root/root.styles";
import { Theme } from "src/root/root.theme";
import { isNil } from "src/shared/shared.typeGuards";
import styled from "styled-components";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      backgroundColor: "#FFF",
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 10px",
      outline: 0,
      display: "flex",
      flexDirection: "column",
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%)`,
      [`@media (max-width: ${Medias.EXTRA_SMALL.maxWidth}px)`]: {
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
        borderRadius: 0,
        transform: "unset",
      },
      [`@media (min-width: ${Medias.SMALL.minWidth}px)`]: {
        width: "400px",
        height: "560px",
      },

      [`@media (min-width: ${Medias.MEDIUM.minWidth}px)`]: {
        width: "512px",
        height: "560px",
      },

      [`@media (min-width: ${Medias.LARGE.minWidth}px)`]: {
        width: "662px",
        height: "560px",
      },
      [`@media (min-width: ${Medias.EXTRA_LARGE.minWidth}px)`]: {
        width: "800px",
        height: "560px",
      },
    },
    root: {
      "& > div:first-child": {
        backgroundColor: "rgba(255, 255, 255, 0.95) !important",
      },
    },
  })
);

const CloseBox = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${Medias.EXTRA_SMALL.maxWidth}px) {
    margin: 0 0 ${Medias.EXTRA_SMALL.margins / 2}px 0;
  }

  @media (min-width: ${Medias.SMALL.minWidth}px) {
    margin: 0 0 ${Medias.SMALL.margins / 2}px 0;
  }

  @media (min-width: ${Medias.MEDIUM.minWidth}px) {
    margin: 0 0 ${Medias.MEDIUM.margins / 2}px 0;
  }

  @media (min-width: ${Medias.LARGE.minWidth}px) {
    margin: 0 0 ${Medias.LARGE.margins / 2}px 0;
  }

  @media (min-width: ${Medias.EXTRA_LARGE.minWidth}px) {
    margin: 0 0 ${Medias.EXTRA_LARGE.margins / 2}px 0;
  }
`;

const PaperContent = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  height: 100%;

  @media (max-width: ${Medias.EXTRA_SMALL.maxWidth}px) {
    margin: ${Medias.EXTRA_SMALL.margins}px;
  }

  @media (min-width: ${Medias.SMALL.minWidth}px) {
    margin: ${Medias.SMALL.margins}px;
  }

  @media (min-width: ${Medias.MEDIUM.minWidth}px) {
    margin: ${Medias.MEDIUM.margins}px;
  }

  @media (min-width: ${Medias.LARGE.minWidth}px) {
    margin: ${Medias.LARGE.margins}px;
  }

  @media (min-width: ${Medias.EXTRA_LARGE.minWidth}px) {
    margin: ${Medias.EXTRA_LARGE.margins}px;
  }
`;

type Props = {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
};

const useModal = ({ isOpen: isOpen_, onClose }: Props) => {
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

  return { isOpen, setIsOpen, handleOnClose, classes };
};

export const Modal = (props: Props) => {
  const state = useModal(props);

  return (
    <MUIModal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={state.isOpen}
      onClose={state.handleOnClose}
      className={state.classes.root}
    >
      <Paper className={state.classes.paper}>
        <PaperContent>
          <CloseBox>
            <IconButton
              iconName="close"
              onClick={state.handleOnClose}
              size="small"
            />
          </CloseBox>
          {props.children}
        </PaperContent>
      </Paper>
    </MUIModal>
  );
};
