import React from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem} from "@material-ui/core";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../Redux/reducers/AuthReducer';
import { Link as RouterLink, useHistory } from "react-router-dom";

import "./header.scss";
import logo from "../../assets/images/logo.svg";
import { IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const headerData = [
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "Venues",
    href: "/venue-list",
  },
  {
    label: "Login",
    href: "/user/login",
  },
];

export default function Header() {
  const user = useSelector((state:RootState)=> state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    dispatch(logout());
    setAnchorEl(null);
    history.push('/user/login');
  };

  const getToolbar = () => {
    return (
      <>
        <Toolbar>
          <Box display='flex' flexGrow={1} >
            <img className="logo" src={logo} alt="logo" />
            <a className="header-text" href="/home">
              Rent4Event
            </a>
          </Box>
          <div className="toolbar-side-nav">{getMenuButtons()}</div>
        </Toolbar>
      </>
    );
  };

  const getMenuButtons = () => {
    return headerData.map(({ label, href}) => {
      return !user || ( user && label !== "Login") ? (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: "side-nav-button",
          }}
        >
          {label}
        </Button>
      ) : (
        <>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
           <AccountCircle className="user-icon" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Whishlist</MenuItem>
            <MenuItem onClick={handleClose}>My Dashboard</MenuItem>
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </Menu>
        </>
      );
    });
  };

  return (
    <header>
      <AppBar className="app-header">{getToolbar()}</AppBar>
    </header>
  );
}
