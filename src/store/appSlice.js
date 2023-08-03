import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    userDetails: {},
  },
  reducers: {
    setUserDetails(state, action) {
      state = { ...state, userDetails: action.payload };
    },
    clearUserDetails(state) {
      state = { ...state, userDetails: {} };
    },
  },
});

export const { setUserDetails, clearUserDetails } = appSlice.actions;
export default appSlice.reducer;
