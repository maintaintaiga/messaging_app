"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "@/lib/messageSlice";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebase";
import Message from "./message";

const MessageList = () => {
  const messages = useSelector((state) => state.messages);
  const username = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log("MESSAGES: ", messages);

  useEffect(() => {
    const onSuccess = (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setMessages(messages));
      const notif = new Notification("New Message!");
    };
    const onError = (error) => {
      console.log(error);
    };
    onSnapshot(collection(db, "messages"), onSuccess, onError);
  }, []);

  console.log(messages);

  return (
    <ul className="space-y-2 p-4 flex flex-col">
      {Array.isArray(messages) &&
        messages.map((message) => (
          <Message
            key={message.id}
            username={message.username || "Anonymous"}
            text={message.text}
            date={message.date}
            currentUser={username}
          />
        ))}
    </ul>
  );
};

export default MessageList;
