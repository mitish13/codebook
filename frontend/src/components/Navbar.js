import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { logout } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { authStatusChecker } from "../actions/user";

import {
  Typography,
  Button,
  Toolbar,
  useScrollTrigger,
  Slide,
  IconButton,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";

function HideOnScrollUp(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "black",
  },

  logo: {
    flexGrow: 1,
    fontFamily: ["'Press Start 2P'", "cursive"],
    fontStyle: "italic",
    fontSize: "40px",
    color: "#bf1363",
    fontWeight: "600",
    userSelect: "none",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px",
      fontSize: "25px",
    },
  },
  b: {
    fontSize: "25px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();

  const { isLoggedin } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch(authStatusChecker());
  }, [dispatch]);

  const classes = useStyles();
  const path = isLoggedin ? window.location : "/user/login";
  const buttonName = isLoggedin ? "Logout" : "Login";

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <HideOnScrollUp>
        <AppBar className={classes.root}>
          <Container maxWidth="xl">
            <Toolbar>
              <Typography className={classes.logo}>
                &lt;ode|<span className={classes.b}>&gt;</span>ook
              </Typography>
              <Link style={{ all: "unset" }} to="/">
                <Button color="secondary" size="large">
                  Home
                </Button>
              </Link>
              <Link style={{ all: "unset" }} to={path}>
                <Button
                  color="secondary"
                  size="large"
                  onClick={buttonName === "Logout" ? logoutHandler : null}
                >
                  {buttonName}
                </Button>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScrollUp>
      <Toolbar />
    </>
  );
};

export default Navbar;
