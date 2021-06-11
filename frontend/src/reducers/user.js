import * as constants from "../constants/index";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
      return { userInfo: action.payload, isLoggedin: true };
    case constants.LOGIN_FAIL:
      return { isLoggedin: false, errMessage: action.payload };
    case constants.LOGOUT:
      return { isLoggedin: false };
    case constants.CHECK_AUTH_STATUS:
      return { ...state, isLoggedin: action.payload };
    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SIGNUP_SUCCESS:
      return { userInfo: action.payload, isLoggedin: true };
    case constants.SIGNUP_FAIL:
      return { isLoggedin: false, errMessage: action.payload };
    default:
      return state;
  }
};
