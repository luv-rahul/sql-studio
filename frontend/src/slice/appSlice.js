import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    showSideBar: false,
    queryValue: "",
    queryResult: null,
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
  },
});

export const { toggleSideBar,setQueryValue,setQueryResult } = appSlice.actions;
export default appSlice.reducer;
