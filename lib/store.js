// store.js
import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messageSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    messages: messageReducer,
    user: userReducer,
  },
});

export default store;
