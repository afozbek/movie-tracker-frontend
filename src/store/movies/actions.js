import {
  GET_MOVIES,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_STARTED,
  GET_MOVIES_FAILED,
} from "./types";

import axios from "../../axios-movie-instance";

const API_KEY = "174e6bfc840b640cbba20b4f1eec48a8";

export const getMovies = (filterType, currentPage = 1) => {
  console.log(filterType);
  return (dispatch) => {
    axios
      .get(`/movie/${filterType}`, {
        params: { api_key: API_KEY, page: currentPage },
      })
      .then((res) => {
        dispatch(getMoviesSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.mesage);
      });
  };
};

const getMoviesSuccess = (responseData) => ({
  type: GET_MOVIES_SUCCESS,
  payload: responseData,
});
