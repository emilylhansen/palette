import React, { useRef, useState, useEffect, ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { IconButton } from "src/design/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "src/root/root.theme";
import { Medias } from "src/root/root.styles";

const useStyles = makeStyles((theme: Theme["mui"]) => {
  return createStyles({
    root: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  });
});

const Shimmie = keyframes`
    20% {
      transform: translateY(6px);
    }
    40% {
      transform: translateY(-6px);
    }
    60% {
      transform: translateY(4px);
    }
    80% {
      transform: translateY(-2px);
    }
    100% {
      transform: translateY(0);
    }
`;

const ScrollToTopBox = styled.div`
  width: 100%;
  height: 100%;
`;

const ScrollContentBox = styled.div`
  overflow-y: scroll;
  height: 100%;
  position: relative;
  width: 100%;
`;

const IconButtonBox = styled.div`
  position: absolute;

  @media (max-width: ${Medias.EXTRA_SMALL.maxWidth}px) {
    bottom: ${Medias.EXTRA_SMALL.margins}px;
    right: ${Medias.EXTRA_SMALL.margins}px;
  }

  @media (min-width: ${Medias.SMALL.minWidth}px) {
    bottom: ${Medias.SMALL.margins}px;
    right: ${Medias.SMALL.margins}px;
  }

  @media (min-width: ${Medias.MEDIUM.minWidth}px) {
    bottom: ${Medias.MEDIUM.margins}px;
    right: ${Medias.MEDIUM.margins}px;
  }

  @media (min-width: ${Medias.LARGE.minWidth}px) {
    bottom: ${Medias.LARGE.margins}px;
    right: ${Medias.LARGE.margins}px;
  }

  @media (min-width: ${Medias.EXTRA_LARGE.minWidth}px) {
    bottom: ${Medias.EXTRA_LARGE.margins}px;
    right: ${Medias.EXTRA_LARGE.margins}px;
  }

  &:hover {
    animation: ${Shimmie} 1s ease;
    animation-iteration-count: 1;
  }
`;

type Props = { children: ReactNode };

const useScrollToTop = (props: Props) => {
  const [displayButton, setDisplayButton] = useState<boolean>(false);
  const scrollEl = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  useEffect(() => {
    scrollEl.current.addEventListener("scroll", onScroll);
  }, []);

  const onScroll = () => {
    scrollEl.current.scrollTop > scrollEl.current.clientHeight
      ? setDisplayButton(true)
      : setDisplayButton(false);
  };

  const scrollToTop = () =>
    scrollEl.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  return { scrollEl, classes, displayButton, scrollToTop };
};

export const ScrollToTop = (props: Props) => {
  const state = useScrollToTop(props);

  return (
    <ScrollToTopBox>
      <ScrollContentBox ref={state.scrollEl}>{props.children}</ScrollContentBox>
      {state.displayButton && (
        <IconButtonBox onClick={state.scrollToTop}>
          <IconButton
            iconName="arrow_upward"
            onClick={state.scrollToTop}
            classes={{ root: state.classes.root }}
          />
        </IconButtonBox>
      )}
    </ScrollToTopBox>
  );
};
