import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const sendReport = createAsyncThunk("SEND_REPORT", async (data) => {
  const res = await axios.post("http://localhost:3001/api/report/addreport", data, { withCredentials: true });
  return res.data;
});

export const myReport = createAsyncThunk("MY_REPORT", async () => {
  const res = await axios.get("http://localhost:3001/api/report/myreports", { withCredentials: true });
  return res.data;
});

export const reportById = createAsyncThunk("REPORT_BY_ID", async (id) => {
  const res = await axios.get(`http://localhost:3001/api/report/getreportbyid/${id}`, { withCredentials: true });
  return res.data;
});

const reportReducer = createReducer(
  {},
  {
    [sendReport.fulfilled]: (state, action) => action.payload,
    [myReport.fulfilled]: (state, action) => action.payload,
    [reportById.fulfilled]: (state, action) => action.payload,
  }
);

export default reportReducer;
