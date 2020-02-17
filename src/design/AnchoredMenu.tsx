/** https://material-ui.com/components/menus/ */
import React, { MouseEvent } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { IconButton } from "/Users/emilyhansen/Desktop/palette-app/src/design/IconButton";
import { Icon } from "/Users/emilyhansen/Desktop/palette-app/src/design/Icon";
import styled from "styled-components";
import { IconButtonProps as MaterialIconButtonProps } from "@material-ui/core/IconButton";

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

const StyledMenuItem = withStyles(theme => ({
  root: {
    // "&:focus": {
    //   backgroundColor: theme.palette.primary.main,
    //   "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
    //     color: theme.palette.common.white,
    //   },
    // },
  },
}))(MenuItem);

export const AnchoredMenu = ({ menuItems, toggleIcon, size }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AnchoredMenuBox>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
        iconName={toggleIcon}
        size={size}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item, idx) => (
          <StyledMenuItem
            key={`${item.label}-${idx}`}
            onClick={e => item.onClick(e, () => handleClick(e))}
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
