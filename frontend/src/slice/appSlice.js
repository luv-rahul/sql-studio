import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    showSideBar: false,
  },
  reducers: {
    toggleSideBar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
  },
});

export const { toggleSideBar } = appSlice.actions;
export default appSlice.reducer;
