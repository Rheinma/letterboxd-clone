import {
  SET_LOADING,
  SET_MOVIES,
  SET_MOVIE_DETAIL,
  SET_MOVIE_DETAIL_SLUG,
} from "../actionTypes/actionTypes";

const initialState = {
  movies: [],
  movieDetail: [],
  oneMovie: [],
  loading: false,
};

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case SET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };
    case SET_MOVIE_DETAIL_SLUG:
      return {
        ...state,
        oneMovie: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export default moviesReducer;
