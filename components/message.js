"use client";
import React from "react";

const Message = ({ username, text, date, currentUser }) => {
  console.log(currentUser, username);
  const style = `p-4 w-4/5 bg-white rounded-xl shadow-md space-y-4 ${
    currentUser === username ? "self-end" : "self-start"
  }`;
  return (
    <div className={style}>
      <div className="flex items-center space-x-4">
        <div className="text-lg font-medium text-black">{username}</div>
        <div className="text-gray-500 text-sm">{date}</div>
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

export default Message;
