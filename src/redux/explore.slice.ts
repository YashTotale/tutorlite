import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";

const initialHomeState = {
  explore: [],
};

const exploreSlice = createSlice({
  name: "explore",
  initialState: initialHomeState,
  reducers: {
    updateExplore: (state, action) => {
      state.explore = action.payload;
    },
  },
});

export const { updateExplore } = exploreSlice.actions;

export const exploreReducer = exploreSlice.reducer;

// selectors
export const selectExplore = (state: any) => state.explore.explore;

export default exploreSlice;
