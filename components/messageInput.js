"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMessageWithTimeout } from "@/lib/messageSlice";
import { setUsername } from "@/lib/userSlice";
import { format } from "date-fns";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const sendMessage = () => {
    if (message.trim()) {
      const date = format(new Date(), "HH:mm");
      console.log("date: ", date);
      dispatch(
        addMessageWithTimeout({
          text: message,
          date,
          username: user,
        })
      );
      setMessage("");
    }
  };

  const handleSetUsername = (e) => {
    if (e.target.value) {
      dispatch(setUsername(e.target.value));
      setUser(e.target.value);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        sendMessage();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [message]);

  return (
    <div
      // onSubmit={sendMessage}
      className="flex items-center space-x-4 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a message"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={user}
        onChange={handleSetUsername}
        placeholder="Enter your name"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
      />
      <button
        // type="submit"
        onClick={sendMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
