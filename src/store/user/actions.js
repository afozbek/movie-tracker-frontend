import { LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILED } from "./types";

import axios from "../../axios-instance";

export const login = (username, password, history) => {
  return (dispatch) => {
    dispatch(loginStarted());

    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        dispatch(loginSuccess(res.data));

        // history.push("/");
      })
      .catch((err) => {
        dispatch(loginFailure(err.message));
      });

    // history.push("/");
  };
};

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: {
    ...user,
  },
});

const loginStarted = () => ({
  type: LOGIN_STARTED,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILED,
  payload: {
    error,
  },
});
