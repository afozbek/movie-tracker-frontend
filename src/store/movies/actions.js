import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILED,
  CHANGE_MOVIE_FILTER,
} from "./types";

import axios from "../../axios-movie-instance";

const API_KEY = "174e6bfc840b640cbba20b4f1eec48a8";

export const getMovies = (filterType, currentPage = 1) => {
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
        dispatch(getMoviesFailed(err));
      });
  };
};

export const changeMovieFilterType = (filterType) => ({
  type: CHANGE_MOVIE_FILTER,
  payload: filterType,
});

const getMoviesSuccess = (responseData) => ({
  type: GET_MOVIES_SUCCESS,
  payload: responseData,
});

const getMoviesFailed = (err) => ({
  type: GET_MOVIES_FAILED,
});
