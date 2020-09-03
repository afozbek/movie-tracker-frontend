import {
  GET_MOVIES_FAILED,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_STARTED,
  CHANGE_MOVIE_FILTER,
} from "./types";

const initialState = {
  movieList: [],
  currentPage: 1,
  filterType: "popular",
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_SUCCESS:
      return getMoviesSuccess(state, action.payload);
    case GET_MOVIES_FAILED:
      return state;
    case GET_MOVIES_STARTED:
      return state;
    case CHANGE_MOVIE_FILTER:
      return changeMovieFilter(state, action.payload);
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

const changeMovieFilter = (state, filterType) => {
  return {
    ...state,
    filterType,
  };
};
