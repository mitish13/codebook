import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import { MoreVert, Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../../actions/post";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "black",
    color: "whitesmoke",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    opacity: "0.5",
    borderRadius: "10px",
    "&:hover": {
      opacity: "1",
    },
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "red",
  },
  link: {
    color: "pink",
  },
}));

const Post = ({ post, postId }) => {
  const { title, createdAt, description, tags, _id, user } = post;
  const { isLoggedin } = useSelector((state) => state.userLogin);
  const { loading } = useSelector((state) => state.post);

  const checkPostCreater = () => {
    if (!isLoggedin) {
      console.log("not logged in");
      setButtonVisible(false);
      return null;
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
    if (userInfo === null) {
      console.log("userinfo is null");
      setButtonVisible(false);
      return null;
    }
    if (userInfo.id === null) {
      console.log("userId is null");
      setButtonVisible(false);
      return null;
    }
    if (userInfo.id !== user) {
      console.log(userInfo.id);
      console.log(user);
      console.log("not creater is null");
      setButtonVisible(false);
      return null;
    }

    setButtonVisible(true);
    return null;
  };

  useEffect(() => {
    checkPostCreater();
  });

  //disable edit and delete buttons for non creater
  const [buttonVisible, setButtonVisible] = useState(false);

  const dispatch = useDispatch();
  let postToDelete = false;
  const deleteHandler = () => {
    postToDelete = true;
    console.log("delete click" + postToDelete);
    dispatch(deletePost(post._id));
  };

  const editPath = `/post/edit/${_id}`;
  const classes = useStyles();
  const subheader = `Created ${moment(createdAt).fromNow()}`;
  const descriptionCutter = description.slice(0, 35);
  const descToShow = descriptionCutter + "...";
  return (
    <>
      {postToDelete && loading ? <CircularProgress /> : null}
      <Card
        className={classes.root}
        style={{
          border: "1px solid white",
        }}
      >
        <CardHeader
          subheader={
            <Typography variant="body2" style={{ color: "gray" }}>
              {subheader}
            </Typography>
          }
          title={
            <Link
              to={{ pathname: `/post/${postId}`, id: postId }}
              style={{
                textDecoration: "none",
                color: "inherit",
                pointerEvents: "visibleStroke",
              }}
            >
              {title}
            </Link>
          }
          action={
            <Link to={editPath} hidden={!buttonVisible}>
              <IconButton color="secondary">
                <MoreVert />
              </IconButton>
            </Link>
          }
        />
        <CardContent>
          <Typography
            variant="body2"
            component="p"
            style={{ color: "white", marginBottom: "10px" }}
          >
            {description.length <= 35 ? description : descToShow}
          </Typography>
          <Typography style={{ maxWidth: "25ch" }}>
            {tags.map((tag, index) => {
              return (
                <button
                  disabled
                  key={index}
                  style={{
                    color: "black",
                    backgroundColor: "gray",
                    marginRight: "2px",
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </Typography>
        </CardContent>

        <CardActions>
          <IconButton
            aria-label="Delete"
            onClick={deleteHandler}
            style={{ display: !buttonVisible ? "none" : null }}
          >
            <Delete style={{ color: "red", marginRight: "auto" }} />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;