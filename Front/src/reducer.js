import { combineReducers } from "@reduxjs/toolkit";
import locationReducer from "./state/location";
import reportReducer from "./state/reports";
import userReducer from "./state/user";

const rootReducer = combineReducers({
    user: userReducer,
    location: locationReducer,
    report: reportReducer,
})

export default rootReducer;