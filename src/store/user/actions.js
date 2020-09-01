import {
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
} from "./types";

import axios from "../../axios-instance";

export const checkUserAuthentication = () => {
  return (dispatch) => {
    const jwtToken = localStorage.getItem("jwttoken") || null;

    if (jwtToken) {
      axios
        .get("/checkUserAuthentication", {
          params: { jwtToken },
        })
        .then((res) => {
          const userData = {
            fullName: res.data.user.firstName + " " + res.data.user.lastName,
            user: {
              token: jwtToken,
              username: res.data.username,
              authenticated: true,
            },
          };
          dispatch(loginSuccess(userData));
        })
        .catch((err) => {
          console.log(err);

          dispatch(loginFailed(err.message));
        });
    }
  };
};

export const login = (username, password, history) => {
  return (dispatch) => {
    dispatch(loginStarted());

    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        dispatch(loginSuccess(res.data));

        history.push("/");
      })
      .catch((err) => {
        dispatch(loginFailed(err.message));
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

const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: {
    error,
  },
});

export const logoutHandler = (history) => ({
  type: LOGOUT_SUCCESS,
  payload: history,
});
