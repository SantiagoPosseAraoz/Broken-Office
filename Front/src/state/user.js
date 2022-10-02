import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// CommonJS.

export const logIn = createAsyncThunk("LOG_IN", async (user) => {
  try {
    const res = await axios.post("http://localhost:3001/api/user/login", user, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    Swal.fire({
      text: "Datos incorrectos.",
      width: 400,
      showConfirmButton: false,
      timer: 1500,
      color: "secondary",
    });
  }
});

export const sendMe = createAsyncThunk("SEND_ME", async () => {
  const res = await axios.get("http://localhost:3001/api/user/me", {
    withCredentials: true,
  });
  return res.data;
});

export const logOut = createAsyncThunk("LOG_OUT", async () => {
  const res = await axios.post(
    "http://localhost:3001/api/user/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return res.data;
});

export const update = createAsyncThunk("UPDATE", async (data, thunk) => {
  const { user } = thunk.getState();
  return axios.put(`http://localhost:3001/api/user/${user.id}`, data, {
    withCredentials: true,
  }).data;
});

const userReducer = createReducer([], {
  [logIn.fulfilled]: (state, action) => action.payload,
  [sendMe.fulfilled]: (state, action) => action.payload,
  [logOut.fulfilled]: (state, action) => action.payload,
  [update.fulfilled]: (state, action) => action.payload,
});

export default userReducer;
