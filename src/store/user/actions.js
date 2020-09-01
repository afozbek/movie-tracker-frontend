import { USER_LOGIN } from "./types";

export const login = (username, password, history) => ({
  type: USER_LOGIN,
  payload: { username, password, history },
});
