// store/messageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
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

/*export const listenForMessages = () => async (dispatch) => {
  try {
    const mySnapshot = db.collection("messages").onSnapshot(
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setMessages(messages));
      },
      (error) => {
        console.log(error);
      }
    );
  } catch (error) {
    console.log(error);
  }
};*/

export const addMessageWithTimeout = createAsyncThunk(
  "messages/addMessageWithTimeout",
  async (message, { dispatch }) => {
    const docRef = await addDoc(collection(db, "messages"), message);
    setTimeout(async () => {
      await deleteDoc(doc(db, "messages", docRef.id));
      //  dispatch(removeMessage(docRef.id));
    }, 5000);
    return { id: docRef.id, ...message };
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    setMessages: (state, action) => {
      console.log("ACTION/PAYLOAD: ", action.payload);
      return action.payload;
    },
    removeMessage: (state, action) => {
      console.log("in remove: ", state, action);
      return state.messages.filter((message) => message.id !== action.payload);
    },
  },
});

export const { setMessages, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
