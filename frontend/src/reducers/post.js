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
    case constant.DELETE_POST_FAIL:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case constant.SEARCH_POST:
      const { term, searchBy } = action.payload;
      console.log(term, searchBy);
      if (searchBy === "tags") {
        console.log("in tags reducer");
        const cloned = [...state.posts];
        let newArray = [];
        for (let i = 0; i < cloned.length; i++) {
          //each post
          for (let j = 0; j < cloned[i].tags.length; j++) {
            //each tag of given post
            if (cloned[i].tags[j].includes(term)) {
              newArray.push(cloned[i]);
            }
          }
        }

        console.log(newArray);

        return {
          ...state,
          posts: newArray,
        };
      }

      return {
        ...state,
        posts: state.posts.filter((post) => post[searchBy].includes(term)),
      };

    default:
      return state;
  }
};

export default postReducer;
