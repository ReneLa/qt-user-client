import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { setupListeners } from "@reduxjs/toolkit/query";

import { apiSlice } from "./api/api.slice";
import modalReducer from "./modal/modal.slice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  Modal: modalReducer
});

const setupStore = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware).concat(logger),
    devTools: process.env.NODE_ENV !== "production"
  });

export const store = setupStore();

setupListeners(store.dispatch);
