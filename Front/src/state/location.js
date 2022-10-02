import { createReducer, createAction } from "@reduxjs/toolkit";

export const setUbication = createAction("SET_UBICATION");

const locationReducer = createReducer([], {
  [setUbication]: (state, action) => action.payload,
});
export default locationReducer;
