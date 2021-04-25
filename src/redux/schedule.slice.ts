import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface scheduleState {
  selectOptions: any;
}

const initState: scheduleState = {
  selectOptions: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: initState,
  reducers: {
    updateSelectOptions: (state, action) => {
      state.selectOptions.push(action.payload);
    },
  },
});

export const { updateSelectOptions } = scheduleSlice.actions;

export const scheduleReducer = scheduleSlice.reducer;

// selectors
export const selectOptions = (state: any) => state.schedule.selectOptions;

export default scheduleSlice;
