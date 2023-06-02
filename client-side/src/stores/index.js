import movieReducer from "./reducers/movieReducer";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

let store = createStore(movieReducer, applyMiddleware(thunk));

export default store;
