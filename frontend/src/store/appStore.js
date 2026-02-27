import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import appReducer from "../slice/appSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});

export default appStore;
