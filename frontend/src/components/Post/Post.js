import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import {
  MoreVert,
  FavoriteBorder,
  CommentOutlined,
  Delete,
} from "@material-ui/icons";
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
}));

const Post = ({ post, postId }) => {
  console.log(postId);
  const { title, imageFiles, createdAt, description, tags, _id, user } = post;
  console.log("post user:" + post.user);
  const { isLoggedin } = useSelector((state) => state.userLogin);
  const { loading } = useSelector((state) => state.post);

  useEffect(() => {
    checkPostCreater();
  }, [isLoggedin]);

  //disable edit and delete buttons for non creater
  const [buttonVisible, setButtonVisible] = useState(false);
  console.log(buttonVisible);
  function checkPostCreater() {
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
  }
  const dispatch = useDispatch();
  let postToDelete;
  const deleteHandler = () => {
    postToDelete = post._id;
    console.log("delete click");
    dispatch(deletePost(post._id));
  };

  const editPath = `/post/edit/${_id}`;
  const classes = useStyles();
  const handleEdit = () => {};
  const imageBase64 = imageFiles[0].base64;
  const subheader = `Created ${moment(createdAt).fromNow()}`;
  console.log(postToDelete === postId ? "Aj 6e" : "aaa");
  return (
    <>
      {postToDelete === postId && loading ? <CircularProgress /> : null}
      <Card
        className={classes.root}
        style={{
          border: "1px solid white",
        }}
      >
        <CardHeader
          title={title}
          subheader={
            <Typography variant="body2" style={{ color: "gray" }}>
              {subheader}
            </Typography>
          }
          action={
            <Link to={editPath} hidden={!buttonVisible}>
              <IconButton color="secondary">
                <MoreVert />
              </IconButton>
            </Link>
          }
        />
        <CardMedia className={classes.media} image={imageBase64} />

        <CardContent>
          <Typography style={{ maxWidth: "25ch" }}>
            {tags.map((tag) => {
              return (
                <button
                  disabled
                  style={{
                    color: "white",
                    backgroundColor: "black",
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
          <IconButton aria-label="Like" color="secondary">
            <FavoriteBorder />
          </IconButton>
          <IconButton aria-label="Comment" color="secondary">
            <CommentOutlined />
          </IconButton>
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
