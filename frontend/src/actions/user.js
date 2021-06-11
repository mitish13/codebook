import * as constants from "../constants";
import axios from "../apis/index";
import { authChecker } from "../utils/authChecker";

export const login = (email, password) => async (dispatch) => {
  try {
    //2 actions - login success , login fail
    const { data } = await axios.post("/user/login", { email, password });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: constants.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    const errMessage = error.response.data.message;

    if (errMessage)
      dispatch({ type: constants.LOGIN_FAIL, payload: errMessage });
  }
};

export const logout = () => {
  localStorage.removeItem("userInfo");
  return { type: constants.LOGOUT };
};

export const authStatusChecker = () => {
  const status = authChecker();
  return { type: constants.CHECK_AUTH_STATUS, payload: status };
};

export const register = (username, email, password, confirmpassword) => async (
  dispatch
) => {
  try {
    const { data } = await axios.post(
      "/user/register",
      {
        username,
        password,
        confirmPassword: confirmpassword,
        email,
      },
      { responseType: "json" }
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: constants.SIGNUP_SUCCESS, payload: data });
    dispatch({ type: constants.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response.data.message;
    dispatch({ type: constants.SIGNUP_FAIL, payload: errorMessage });
  }
};
