// messageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
    removeMessage: (state, action) => {
      return state.filter((message) => message.id !== action.payload);
    },
  },
});

export const { addMessage, removeMessage } = messageSlice.actions;

export const addMessageWithTimeout = (message) => (dispatch) => {
  const id = new Date().getTime();
  dispatch(addMessage({ ...message, id }));
  setTimeout(() => {
    dispatch(removeMessage(id));
  }, 5000);
};

export default messageSlice.reducer;
