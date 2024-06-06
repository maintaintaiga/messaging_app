// store/messageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    let messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    return messages;
  }
);

export const addMessageWithTimeout = createAsyncThunk(
  "messages/addMessageWithTimeout",
  async (message, { dispatch }) => {
    const docRef = await addDoc(collection(db, "messages"), message);
    setTimeout(async () => {
      await deleteDoc(doc(db, "messages", docRef.id));
      dispatch(removeMessage(docRef.id));
    }, 5000);
    return { id: docRef.id, ...message };
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    removeMessage: (state, action) => {
      return state.filter((message) => message.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addMessageWithTimeout.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
