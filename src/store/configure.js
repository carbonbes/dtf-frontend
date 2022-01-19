import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./rootReducer";
import rootSaga from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
