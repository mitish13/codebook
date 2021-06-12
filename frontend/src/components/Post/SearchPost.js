import React, { useState } from "react";
import {
  InputBase,
  makeStyles,
  fade,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { searchPost, fetchPosts } from "../../actions/post";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "inherit",
    backgroundColor: "gray",
    opacity: "0.5",
    color: "black",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "80%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  select: {
    paddingRight: `calc(1em + ${theme.spacing(2)}px)`,
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 1, 1, 1),
    },
  },
}));
const SearchPost = () => {
  const classes = useStyles();
  const [searchBy, setSearchBy] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setSearchBy(e.target.value);
  };

  const closeHandler = () => {
    if (searchTerm !== "") {
      setSearchTerm("");
      dispatch(fetchPosts());
    }
  };

  const termChangeHandler = (e) => {
    const captureText = e.target.value;
    if (captureText === "") {
      dispatch(fetchPosts());
    }
    setSearchTerm(captureText);

    dispatch(searchPost({ term: captureText, searchBy }));
  };
  return (
    <>
      <Search style={{ color: "#bf1363", position: "inherit" }} />
      <InputBase
        placeholder="Search by"
        type="select"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        value={searchTerm}
        onChange={termChangeHandler}
      />
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        value={searchBy}
        className={classes.select}
        color="secondary"
        onChange={changeHandler}
        onClose={closeHandler}
        style={{ color: "white", fontFamily: "monospace" }}
      >
        <MenuItem value="title">title</MenuItem>
        <MenuItem value="tags">tag</MenuItem>
        <MenuItem value="description">description</MenuItem>
      </Select>
    </>
  );
};

export default SearchPost;
