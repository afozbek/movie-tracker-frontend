import { LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_STARTED } from "./types";

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
    default:
      return state;
  }
};

const loginSuccess = (state, data) => {
  const { fullName, user } = data;

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
  return state;
};

const loginStarted = (state) => {
  return state;
};
