import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";

export default configureStore({
  reducer: {
    clusters: userReducer,
  },
});
