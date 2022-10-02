import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import locationReducer from "./location";

import reportReducer from "./reports";
import userReducer from "./user";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    location: locationReducer,
    report: reportReducer,
  },
});

export default store;
