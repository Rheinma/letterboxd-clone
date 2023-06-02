import genresReducer from "./genresReducer";
import moviesReducer from "./moviesReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  genresReducer: genresReducer,
  moviesReducer: moviesReducer,
});

export default rootReducer;
