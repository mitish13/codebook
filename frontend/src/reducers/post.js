import * as constant from "../constants";

const initialStates = {
  posts: [],
  post: {},
  message: "",
  loading: false,
};
const postReducer = (state = initialStates, action) => {
  switch (action.type) {
    case constant.FETCH_POSTS_REQUEST:
      return { ...state, loading: true, posts: [], post: {} };
    case constant.FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.payload, loading: false, post: {} };

    case constant.FETCH_POST_REQUEST:
      return { ...state, loading: true, post: {} };
    case constant.FETCH_POST_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case constant.FETCH_POST_FAIL:
      return { ...state, loading: false, message: action.payload, post: {} };
    case constant.FETCH_POST_CLEAR:
      console.log("clear called");
      return { ...state, post: {} };

    case constant.CREATE_POST_REQUEST:
      return { ...state, loading: true, post: {} };
    case constant.CREATE_POST_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case constant.CREATE_POST_FAIL:
      return { ...state.posts, message: action.payload, loading: false };

    case constant.EDIT_POST_REQUEST:
      return { ...state, loading: true };
    case constant.EDIT_POST_SUCCESS:
      const cloned = [...state.posts];
      const index = cloned.findIndex((post) => post._id === action.payload._id);
      cloned[index] = action.payload;
      console.log("index" + index);
      console.log("new posts");
      console.log(cloned);
      return {
        ...state,
        loading: false,
        posts: cloned,
      };
    case constant.EDIT_POST_FAIL:
      return { ...state.posts, message: action.payload, loading: false };

    case constant.DELETE_POST_REQUEST:
      return { ...state, loading: true };
    case constant.DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default postReducer;
