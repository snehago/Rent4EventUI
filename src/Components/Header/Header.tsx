import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem} from "@material-ui/core";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../Redux/reducers/AuthReducer';
import { Link as RouterLink, useHistory } from "react-router-dom";

import "./header.scss";
import logo from "../../assets/images/logo2.png";
import { IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { User } from '../../Shared/Interfaces/User';

const headerData = [
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "Venues",
    href: "/venue-list",
  },
];

export default function Header() {
  const user: User = useSelector((state:RootState)=> state.auth.user );
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [location, setLocation]= React.useState<string>(window.location.href);
  const open = Boolean(anchorEl);
  const [loading,setLoading]=useState(true);
  
  useEffect(()=> {
    setLocation(window.location.href);
  },[])
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    setLoading(true)
    setTimeout(() => {
      dispatch(logout());
      setLoading(false);
    }, 1000);
    
    setAnchorEl(null);
    history.push('/user/login');
  };

  const moveToWishlist = () => {
    setAnchorEl(null);
    history.push("/wishlist");
  };

  const moveToDashboard = () => {
    setAnchorEl(null);
    history.push(`/dashboard/${user.role}`);
  };

  const getToolbar = () => {
    return (
      <>
        <Toolbar>
          <Box display='flex' style={{display:"flex",alignItems:"center"}} flexGrow={1} >
            <img className="logo" src={logo} alt="logo" />
            {/* <a className="header-text" href="/home">
              Rent4Event
            </a> */}
          </Box>
          <div className="toolbar-side-nav">{getMenuButtons()}</div>
        </Toolbar>
      </>
    );
  };

  const getMenuButtons = () => {
    let data:any = headerData.map(({ label, href}) => {
      return  (
        <Button
          {...{
            key: label,
            color:"inherit",
            to: href,
            component: RouterLink,
            className: "side-nav-button",
          }}
          id= {location.toLowerCase().includes(href.toLowerCase())?'activeRoute':href}
        >
          {label}
        </Button>
      )
      
      });
      let loginSection = !user ? (
        <Button
          {...{
            key: "Login",
            color: "primary",
            to: '/user/login',
            component: RouterLink,
            className: "side-nav-login-button",
            variant: "outlined",
          }}
        >
          Login
        </Button>
      ):
      (
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
            <MenuItem onClick={moveToWishlist}>Wishlist</MenuItem>
            <MenuItem onClick={moveToDashboard}>My Dashboard</MenuItem>
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </Menu>
        </>
      );
      data.push(loginSection);
      return data;
}

  return (
    <header>
      <AppBar className="app-header">{getToolbar()}</AppBar>
    </header>
  );
}
