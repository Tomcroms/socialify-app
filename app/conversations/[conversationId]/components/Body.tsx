'use client';

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/app/libs/pusher";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { find } from "lodash";
import { User } from "@prisma/client";

interface BodyProps {
  initialMessages: FullMessageType[];
  currentUser: User | null;
}

const Body: React.FC<BodyProps> = ({ initialMessages = [], currentUser }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    const handleNewMessage = (message: FullMessageType) => {
      console.log('New message received:', message);
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => (find(current, { id: message.id }) ? current : [...current, message]));
      bottomRef.current?.scrollIntoView();
    };

    const handleUpdateMessage = (newMessage: FullMessageType) => {
      console.log('New message update:', newMessage);
      setMessages((messages) => messages.map((current) => (current.id === newMessage.id ? newMessage : current)));
    };

    pusherClient.subscribe(conversationId);
    pusherClient.bind('messages:new', handleNewMessage);
    pusherClient.bind('message:update', handleUpdateMessage);
    bottomRef.current?.scrollIntoView();

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', handleNewMessage);
      pusherClient.unbind('message:update', handleUpdateMessage);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          isFirst={i === 0}
          key={message.id}
          data={message}
          currentUser={currentUser}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
