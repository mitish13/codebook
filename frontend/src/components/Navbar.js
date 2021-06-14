import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { logout } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { authStatusChecker } from "../actions/user";
import { fetchPosts } from "../actions/post";
import SearchPost from "./Post/SearchPost";
import { isDesktop } from "react-device-detect";

import { Button, Toolbar, useScrollTrigger, Slide } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "./Logo";

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
          <div>
            <Toolbar>
              <Logo />
              {currentPath === "/" && isDesktop && <SearchPost />}
              <Link
                style={{ textDecoration: "none" }}
                onClick={postUpdateHandler}
                to="/"
              >
                <Button
                  color="secondary"
                  size="large"
                  style={{ border: "1px solid grey", marginRight: "5px" }}
                >
                  Home
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to={path}>
                <Button
                  color="secondary"
                  size="large"
                  style={{ border: "1px solid grey" }}
                  onClick={buttonName === "Logout" ? logoutHandler : null}
                >
                  {buttonName}
                </Button>
              </Link>
            </Toolbar>
          </div>
        </AppBar>
      </HideOnScrollUp>
      <Toolbar />
    </>
  );
};

export default Navbar;
