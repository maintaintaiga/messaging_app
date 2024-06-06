"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages } from "@/lib/messageSlice";

import Message from "./message";

const MessageList = () => {
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  console.log("messages: ", messages);

  return (
    <ul className="space-y-2 p-4">
      {messages.map((message) => (
        <Message
          key={message.id}
          username={message.username || "Anonymous"}
          text={message.text}
          date={message.id}
        />
      ))}
    </ul>
  );
};

export default MessageList;
