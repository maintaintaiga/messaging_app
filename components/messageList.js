"use client";
import React from "react";
import { useSelector } from "react-redux";

const MessageList = () => {
  const messages = useSelector((state) => state.messages);

  return (
    <ul className="space-y-2 p-4">
      {messages.map((message) => (
        <li
          key={message.id}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
        >
          {message.text}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
