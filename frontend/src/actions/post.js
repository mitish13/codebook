import axios from "../apis";
import * as constants from "../constants";

export const fetchPosts = () => async (dispatch) => {
  console.log("called fetch posts");
  dispatch({ type: constants.FETCH_POSTS_REQUEST });
  try {
    const { data } = await axios.get("/post/get");
    console.log(typeof data);
    console.log(data);
    dispatch({ type: constants.FETCH_POSTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const fetchPost = (id) => async (dispatch) => {
  dispatch({ type: constants.FETCH_POST_REQUEST });
  console.log(id);
  try {
    const { data } = await axios.get(`/post/get/${id}`);
    console.log(data);
    dispatch({ type: constants.FETCH_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: constants.FETCH_POST_FAIL, payload: error.response.data });
  }
};

export const fetchPostClearer = () => {
  return { type: constants.FETCH_POST_CLEAR };
};

export const createPost = (
  { title, description, tags, imageFiles },
  history
) => async (dispatch) => {
  try {
    dispatch({ type: constants.CREATE_POST_REQUEST });
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.post(
      "/post/add",
      {
        title,
        description,
        tags,
        imageFiles,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("new Post response:" + data);
    dispatch({
      type: constants.CREATE_POST_SUCCESS,
      payload: data,
    });
    history.replace("/");
  } catch (error) {
    console.log("History error:" + error);
    if (error.response === undefined) return null;
    if (error.response.data !== undefined) {
      dispatch({
        type: constants.CREATE_POST_FAIL,
        payload: error.response.data.message,
      });
    }
  }
};

export const editPost = (
  { title, tags, imageFiles, description, id },
  history
) => async (dispatch) => {
  try {
    dispatch({ type: constants.EDIT_POST_REQUEST });
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    console.log("action title:" + title);
    const { data } = await axios.post(
      "/post/edit/" + id,
      {
        title,
        tags,
        imageFiles,
        description,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: constants.EDIT_POST_SUCCESS, payload: data });
    console.log("Everything is fine till here");
    history.replace("/");
  } catch (error) {
    console.log("History error:" + error);
    if (error.response === undefined) return null;
    if (error.response.data !== undefined) {
      dispatch({
        type: constants.EDIT_POST_FAIL,
        payload: error.response.data.message,
      });
    }
  }
};

export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: constants.DELETE_POST_REQUEST });

  try {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));

    const { data } = await axios.post(
      `/post/delete/${id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: constants.DELETE_POST_SUCCESS, payload: data._id });
  } catch (error) {
    console.log(error.response);
  }
};
