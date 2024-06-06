// components/Message.js
import React from "react";

const Message = ({ username, text, date }) => {
  const prettyDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-medium text-black">{username}</div>
        <div className="text-gray-500 text-sm">{prettyDate(date)}</div>
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

export default Message;
