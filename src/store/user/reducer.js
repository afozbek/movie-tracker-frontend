import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_STARTED,
  LOGOUT_SUCCESS,
} from "./types";

const initialState = {
  jwtToken: "",
  username: "",
  fullName: "",
  authenticated: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return loginSuccess(state, action.payload);
    case LOGIN_FAILED:
      return loginFailed(state, action.payload);
    case LOGIN_STARTED:
      return loginStarted(state);
    case LOGOUT_SUCCESS:
      return logoutSuccess(state, action.payload);
    default:
      return state;
  }
};

const loginSuccess = (state, data) => {
  console.log(data);
  const { fullName, user } = data;

  localStorage.setItem("jwttoken", user.token);
  localStorage.setItem("username", user.username);

  return {
    ...state,
    jwtToken: user.token,
    username: user.username,
    fullName: fullName,
    authenticated: user.authenticated,
  };
};

// TODO: Buralarda state güncellemelerini düzenliyeceksin
const loginFailed = (state, error) => {
  console.log(error);
  return state;
};

const loginStarted = (state) => {
  return state;
};

const logoutSuccess = (state, history) => {
  localStorage.removeItem("jwttoken");
  localStorage.removeItem("username");

  console.log("logout success");

  return { ...initialState };
};
