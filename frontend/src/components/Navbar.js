import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { logout } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { authStatusChecker } from "../actions/user";
import { fetchPosts } from "../actions/post";
import SearchPost from "./Post/SearchPost";
import { isDesktop } from "react-device-detect";

import {
  Typography,
  Button,
  Toolbar,
  useScrollTrigger,
  Slide,
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
    fontFamily: ["cursive"],
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
    fontFamily: "monospace",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
}));

const Navbar = (props) => {
  const dispatch = useDispatch();
  const currentPath = props.location.pathname;
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

  const postUpdateHandler = () => {
    dispatch(fetchPosts());
  };
  return (
    <>
      <HideOnScrollUp>
        <AppBar className={classes.root}>
          <Container maxWidth="xl">
            <Toolbar>
              <Typography className={classes.logo}>
                <span style={{ fontFamily: "monospace" }}> &lt;</span>ode|
                <span className={classes.b}>&gt;</span>
                ook;
              </Typography>
              {currentPath === "/" && isDesktop && <SearchPost />}
              <Link style={{ all: "unset" }} onClick={postUpdateHandler} to="/">
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
