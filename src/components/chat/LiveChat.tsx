"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, X } from "lucide-react";
import { Button, Input, ScrollArea } from "@/components/ui";
import { useSocket } from "@/hooks/useSocket";
import { cn } from "@/lib/utils";

interface LiveChatProps {
  room: string;
  isOpen: boolean;
  onClose: () => void;
}

export function LiveChat({ room, isOpen, onClose }: LiveChatProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isConnected, messages, typingUsers, joinRoom, leaveRoom, sendMessage, startTyping, stopTyping } =
    useSocket();

  useEffect(() => {
    if (isOpen) {
      joinRoom(room);
    } else {
      leaveRoom(room);
    }
  }, [isOpen, room, joinRoom, leaveRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(room, input);
    setInput("");
    stopTyping(room);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value) {
      startTyping(room);
    } else {
      stopTyping(room);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
      <div className="flex items-center justify-between p-3 border-b bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="font-semibold text-sm">Live Chat</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              isConnected ? "bg-green-400" : "bg-red-400"
            )}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:text-white hover:bg-blue-700"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-medium text-xs text-gray-900">{msg.name}</span>
                <span className="text-xs text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-0.5">{msg.content}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {typingUsers.length > 0 && (
        <div className="px-3 py-1 text-xs text-gray-500">
          {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
        </div>
      )}

      <div className="p-3 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || !isConnected}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
