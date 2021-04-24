import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface homeStateType {
  appointments: any;
  tutorStudents: any;
}

const initialHomeState: homeStateType = {
  appointments: [],
  tutorStudents: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialHomeState,
  reducers: {
    updateAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    updateTutorStudents: (state, action) => {
      state.tutorStudents.push(action.payload);
    },
  },
});

export const { updateAppointments, updateTutorStudents } = homeSlice.actions;

export const homeReducer = homeSlice.reducer;

// selectors
export const selectAppointments = (state: any) => state.home.appointments;
export const selectTS = (state: any) => state.home.tutorStudents;

export default homeSlice;
