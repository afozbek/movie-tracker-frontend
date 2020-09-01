import { USER_LOGIN } from "./types";

import axios from "../../axios-instance";

const initialState = {
  jwtToken: "",
  username: "",
  authenticated: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return login(state, action.payload);
    default:
      return state;
  }
};

const login = (state, payload) => {
  const { username, password, history } = payload;

  axios
    .post("/auth/login", { username, password })
    .then((res) => {
      localStorage.setItem("jwttoken", res.data.token);
      localStorage.setItem("username", res.data.username);

      history.push("/users");

      return {
        ...initialState,
        jwtToken: res.data.token,
        username: res.data.username,
        authenticated: true,
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        ...initialState,
      };
    });

  return state;
};
