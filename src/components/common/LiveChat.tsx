"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <>
      {/* Tab button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-1/2 -translate-y-1/2 right-0 z-50 bg-primary text-white rounded-l-xl shadow-lg hover:bg-primary/90 transition-all flex flex-col items-center justify-center gap-2 py-5 px-3"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-[11px] font-semibold tracking-wide" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
          SUPPORT
        </span>
      </button>

      {/* Small chat popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 -translate-y-1/2 right-12 z-50 w-[280px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary px-3 py-2.5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-xs">KKIT Support</p>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    <span className="text-[10px] text-white/80">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>

            {/* Messages */}
            <div className="px-3 py-3 bg-background-secondary min-h-[180px]">
              <div className="flex gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-primary">K</span>
                </div>
                <div className="bg-muted rounded-lg px-3 py-2 max-w-[80%]">
                  <p className="text-xs text-foreground">
                    Hi there! How can we help you today?
                  </p>
                </div>
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-3 py-2 border-t border-border">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 h-8 px-2.5 rounded-lg border border-border bg-background text-[11px] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button
                  type="submit"
                  className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
