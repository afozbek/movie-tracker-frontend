import {
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_STARTED,
} from "./types";

import axios from "../../axios-instance";

export const checkUserAuthentication = () => {
  return (dispatch) => {
    const jwtToken = localStorage.getItem("jwttoken") || null;

    if (jwtToken) {
      axios
        .get("/checkUserAuthentication")
        .then((res) => {
          const userData = {
            fullName: res.data.user.firstName + " " + res.data.user.lastName,
            user: {
              token: jwtToken,
              username: res.data.user.username,
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

export const register = (userData, history) => {
  return (dispatch) => {
    dispatch(registerStarted());

    axios
      .post("/auth/register", userData)
      .then((res) => {
        dispatch(registerSuccess(res.data));

        history.push("/");
      })
      .catch((err) => {
        dispatch(registerFailed(err.message));
      });
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

const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: {
    ...user,
  },
});

const registerStarted = () => ({
  type: REGISTER_STARTED,
});

const registerFailed = (error) => ({
  type: REGISTER_FAILED,
  payload: {
    error,
  },
});

export const logoutHandler = (history) => ({
  type: LOGOUT_SUCCESS,
  payload: history,
});
