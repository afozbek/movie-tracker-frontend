import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILED,
  CHANGE_MOVIE_FILTER,
} from "./types";

import axios from "../../axios-movie-instance";
import { __MOVIE_PUBLIC_API_KEY__ } from "./../../utils/index";

export const getMovies = (filterType, currentPage = 1) => {
  return (dispatch) => {
    axios
      .get(`/movie/${filterType}`, {
        params: { api_key: __MOVIE_PUBLIC_API_KEY__, page: currentPage },
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
