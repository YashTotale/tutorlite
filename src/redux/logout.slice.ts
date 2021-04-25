import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const logoutSlice = createSlice({
  name: "logout",
  initialState: {},
  reducers: {
    logout: (state) => {
      console.log("logging out");
    },
  },
});

export const { logout } = logoutSlice.actions;

export const logoutReducer = logoutSlice.reducer;

export default logoutSlice;
