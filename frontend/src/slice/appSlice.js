import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    showSideBar: false,
    queryValue: "",
    queryResult: null,
    selectedAssignment: null,
    selectedAssignmentId: null,
  },
  reducers: {
    toggleSideBar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
    setQueryValue: (state, action) => {
      state.queryValue = action.payload;
    },
    setQueryResult: (state, action) => {
      state.queryResult = action.payload;
    },
    setSelectedAssignment: (state, action) => {
      state.selectedAssignment = action.payload;
    },
    setSelectedAssignmentId: (state, action) => {
      state.selectedAssignmentId = action.payload;
    },
  },
});

export const {
  toggleSideBar,
  setQueryValue,
  setQueryResult,
  setSelectedAssignment,
  setSelectedAssignmentId,
} = appSlice.actions;
export default appSlice.reducer;
