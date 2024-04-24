import { createStore, compose, applyMiddleware } from "redux";
import { reducers } from "../Reducers/index";
import thunk from "redux-thunk";
import { verifyToken } from "../Actions/User/user";
const reduxDevTools =
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
    ? (a) => a
    : window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__();
export const store = createStore(
  reducers,
  compose(applyMiddleware(thunk), reduxDevTools)
);
store.dispatch(verifyToken());
