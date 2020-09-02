import {
  GET_MOVIES,
  GET_MOVIES_FAILED,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_STARTED,
} from "./types";

const initialState = {
  movieList: [],
  currentPage: 1,
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_SUCCESS:
      return getMoviesSuccess(state, action.payload);
    case GET_MOVIES_FAILED:
      return state;
    case GET_MOVIES_STARTED:
      return state;
    default:
      return state;
  }
};

const getMoviesSuccess = (state, movieList) => {
  return {
    ...state,
    movieList: [...movieList.results],
    currentPage: movieList.page,
  };
};
