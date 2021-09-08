import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  Menu,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import logoSrc from "../../assets/images/mobile_logo.png";
import { Link as RouterLink, useHistory } from "react-router-dom";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { User } from "../../Shared/Interfaces/User";
import { AccountCircle } from "@material-ui/icons";
import { logout } from "../../Redux/reducers/AuthReducer";

const headersData = [
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "Venues",
    href: "/venue-list",
  },
  {
    label: "Wishlist",
    href: "/wishlist",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    position:"fixed",
    overflow:"hidden",
    backgroundColor: "#ffffff",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  menuButton: {
    color:"#000000",
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "30px 40px",
  },
}));

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user: User = useSelector((state:RootState) => state.auth.user);
  const { header, menuButton, toolbar, drawerContainer } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;
const open = Boolean(anchorEl);

const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

const logoutUser = () => {
  setTimeout(() => {
    dispatch(logout());
  }, 1000);

  setAnchorEl(null);
  history.push("/user/login");
};

const moveToWishlist = () => {
  setAnchorEl(null);
  history.push("/wishlist");
};

const moveToDashboard = () => {
  setAnchorEl(null);
  history.push(`/dashboard/${user.role}`);
};

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{femmecubatorLogo}</div>
        <div style={{float:"right"}} >
          {!user ? (
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
      )}
        </div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const femmecubatorLogo = <img height="100%"  width="100%" className="logo" src={logoSrc} alt="logo" />;

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
