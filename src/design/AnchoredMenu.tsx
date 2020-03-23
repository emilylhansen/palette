import React, { MouseEvent } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { IconButton } from "src/design/IconButton";
import { Icon } from "src/design/Icon";
import styled, { css } from "styled-components";
import { IconButtonProps as MaterialIconButtonProps } from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "src/root/root.theme";

const useStyles = makeStyles((theme: Theme["mui"]) => {
  return createStyles({
    root: {
      color: theme.palette.primary.contrastText,
    },
  });
});

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const AnchoredMenuBox = styled.div``;

export type MenuItem = {
  icon: string;
  label: string;
  onClick: (e: MouseEvent<HTMLElement>, cb: () => void) => void;
};

type Props = {
  menuItems: Array<MenuItem>;
  toggleIcon: string;
  size?: MaterialIconButtonProps["size"];
};

const StyledMenuItem = withStyles((theme: Theme["mui"]) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.primary.contrastText,
      },
    },
  },
}))(MenuItem);

const useAnchoredMenu = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  return {
    anchorEl,
    setAnchorEl,
    handleClick,
    handleClose,
    classes,
  };
};

export const AnchoredMenu = (props: Props) => {
  const state = useAnchoredMenu(props);

  return (
    <AnchoredMenuBox>
      <IconButton
        onClick={state.handleClick}
        iconName={props.toggleIcon}
        size={props.size}
        classes={{ root: state.classes.root }}
      />
      <StyledMenu
        anchorEl={state.anchorEl}
        open={Boolean(state.anchorEl)}
        onClose={state.handleClose}
      >
        {props.menuItems.map((item, idx) => (
          <StyledMenuItem
            key={`${item.label}-${idx}`}
            onClick={e => item.onClick(e, () => state.handleClick(e))}
          >
            <ListItemIcon>
              <Icon iconName={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </AnchoredMenuBox>
  );
};
