"use client";
import MessageInput from "@/components/messageInput";
import MessageList from "@/components/messageList";
import store from "@/lib/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <MessageInput />
          <MessageList />
        </div>
      </main>
    </Provider>
  );
}
