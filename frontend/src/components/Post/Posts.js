import React, { useEffect } from "react";
import Post from "./Post";
import { fetchPostClearer, fetchPosts } from "../../actions/post";
import { Grow, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const Posts = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts());
    dispatch(fetchPostClearer());
  }, [dispatch]);

  return (
    <div>
      {loading && <CircularProgress color="secondary" />}
      <Grow in>
        <Grid container spacing={2} lg={12}>
          {posts.map((post) => {
            return (
              <Grid item xs={12} md={4} lg={4} sm={12}>
                <Post post={post} key={post._id} postId={post._id} />
              </Grid>
            );
          })}
        </Grid>
      </Grow>
    </div>
  );
};

export default Posts;
