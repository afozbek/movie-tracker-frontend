import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_STARTED,
  LOGOUT_SUCCESS,
  REGISTER_STARTED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "./types";

const initialState = {
  jwtToken: "",
  username: "",
  fullName: "",
  watchlist: [],
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
    case REGISTER_STARTED:
      return registerStarted(state);
    case REGISTER_SUCCESS:
      return registerSuccess(state, action.payload);
    case REGISTER_FAILED:
      return registerFailed(state, action.payload);
    default:
      return state;
  }
};

const loginSuccess = (state, data) => {
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

const registerSuccess = (state, data) => {
  console.log("REGISTER", data);
  const { token, user, authenticated } = data;

  localStorage.setItem("jwttoken", token);
  localStorage.setItem("username", user.username);
  return {
    ...state,
    jwtToken: token,
    username: user.username,
    fullName: user.firstName + " " + user.lastName,
    authenticated,
  };
};

const registerFailed = (state, error) => {
  console.log(error);
  return state;
};

const registerStarted = (state) => {
  return state;
};

const logoutSuccess = (state, history) => {
  localStorage.removeItem("jwttoken");
  localStorage.removeItem("username");

  history.push("/login");

  return { ...initialState };
};
