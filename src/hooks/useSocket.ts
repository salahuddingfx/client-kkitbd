"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  userId: string;
  name: string;
  avatar?: { url: string };
  content: string;
  room: string;
  timestamp: Date;
}

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("client_accessToken");
    if (!token) return;

    const socket = io(process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:5000", {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("new-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("user-typing", (data: { userId: string; name: string }) => {
      setTypingUsers((prev) => {
        if (!prev.includes(data.name)) {
          return [...prev, data.name];
        }
        return prev;
      });
    });

    socket.on("user-stop-typing", (data: { userId: string }) => {
      setTypingUsers((prev) => prev.filter((_, i) => i !== 0));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = useCallback((roomId: string) => {
    socketRef.current?.emit("join-room", roomId);
  }, []);

  const leaveRoom = useCallback((roomId: string) => {
    socketRef.current?.emit("leave-room", roomId);
    setMessages([]);
  }, []);

  const sendMessage = useCallback((room: string, content: string) => {
    socketRef.current?.emit("send-message", { room, content });
  }, []);

  const startTyping = useCallback((room: string) => {
    socketRef.current?.emit("typing", { room });
  }, []);

  const stopTyping = useCallback((room: string) => {
    socketRef.current?.emit("stop-typing", { room });
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isConnected,
    messages,
    typingUsers,
    joinRoom,
    leaveRoom,
    sendMessage,
    startTyping,
    stopTyping,
    clearMessages,
  };
};
