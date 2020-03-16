import React, { ReactNode, CSSProperties } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { isNil } from "src/shared/shared.typeGuards";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { GutterSize, Gutters, makeGutters } from "src/design/design.helpers";

type StyledTypographyProps = Omit<TextProps, "children" | "gutterBottom"> & {
  gutterBottom_: TextProps["gutterBottom"];
};

const useStyles = makeStyles<StyledTypographyProps>({
  root: {
    fontWeight: (props: StyledTypographyProps) =>
      isNil(props.fontWeight) ? 400 : props.fontWeight,
    margin: (props: StyledTypographyProps) =>
      makeGutters({
        gutterTop: props.gutterTop,
        gutterBottom: props.gutterBottom_,
        gutterRight: props.gutterRight,
        gutterLeft: props.gutterLeft,
      }),
    color: (props: StyledTypographyProps) => props.color,
  },
});

type TextProps = {
  children: ReactNode;
  fontWeight?: number;
} & Gutters &
  Omit<TypographyProps, "gutterBottom">;

export const Text = ({
  children,
  fontWeight,
  gutterTop,
  gutterBottom,
  gutterRight,
  gutterLeft,
  ...typographyProps
}: TextProps) => {
  const classes = useStyles({
    fontWeight,
    gutterTop,
    gutterBottom_: gutterBottom,
    gutterRight,
    gutterLeft,
    ...typographyProps,
  });

  return (
    <Typography {...typographyProps} className={classes.root}>
      {children}
    </Typography>
  );
};
