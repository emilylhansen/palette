import { default as MUIButton, ButtonProps } from "@material-ui/core/Button";
import React from "react";
import { GutterSize, Gutters, makeGutters } from "src/design/design.helpers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles<Props>({
  root: {
    margin: (props: Props) =>
      makeGutters({
        gutterTop: props.gutterTop,
        gutterBottom: props.gutterBottom,
        gutterRight: props.gutterRight,
        gutterLeft: props.gutterLeft,
      }),
  },
});

type Props = Gutters & ButtonProps;

export const Button = ({
  children,
  gutterTop,
  gutterBottom,
  gutterRight,
  gutterLeft,
  ...buttonProps
}: Props) => {
  const classes = useStyles({
    gutterTop,
    gutterBottom,
    gutterRight,
    gutterLeft,
    ...buttonProps,
  });

  return (
    <MUIButton className={classes.root} {...buttonProps}>
      {children}
    </MUIButton>
  );
};
