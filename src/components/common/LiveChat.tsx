"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, CheckCircle2 } from "lucide-react";
import { siteSettingsApi } from "@/services/api";

const WhatsAppIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.435 2.5 1.171 3.468L6.4 18.256l2.946-1.002a5.728 5.728 0 002.684.685h.002c3.181 0 5.767-2.586 5.768-5.766 0-1.54-.599-2.987-1.688-4.077a5.725 5.725 0 00-4.081-1.924zm3.36 8.211c-.144.405-.837.775-1.17.825-.333.05-.762.072-2.18-.49-1.815-.719-2.985-2.56-3.076-2.68-.09-.12-.734-.977-.734-1.864 0-.887.465-1.322.63-1.493.165-.17.36-.214.48-.214.12 0 .24.002.345.006.11.005.257-.042.402.308.15.36.51 1.246.555 1.336.045.09.075.195.015.315-.06.12-.09.195-.18.3-.09.105-.189.234-.27.315-.09.09-.184.187-.079.367.105.18.468.772.998 1.244.68.607 1.253.795 1.433.885.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.099.84z"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 2.219.722 4.27 1.947 5.932L2 22l4.223-1.879A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.954 7.954 0 01-4.148-1.166l-.297-.174-2.508 1.116 1.106-2.435-.19-.304A7.957 7.957 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
  </svg>
);

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("8801700000000");
  const [defaultGreeting, setDefaultGreeting] = useState("Hi KKIT Support! I'd like to inquire about your services.");

  useEffect(() => {
    siteSettingsApi.getPublic(["whatsapp_number", "whatsapp_default_message"])
      .then((res) => {
        if (res.data?.whatsapp_number) {
          setWhatsappNumber(res.data.whatsapp_number);
        }
        if (res.data?.whatsapp_default_message) {
          setDefaultGreeting(res.data.whatsapp_default_message);
        }
      })
      .catch(() => {
        // Fallback to default if API fails
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage("");
  };

  const handleWhatsAppClick = () => {
    const textToSend = message.trim() || defaultGreeting;
    const encoded = encodeURIComponent(textToSend);
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, "_blank");
  };

  return (
    <>
      {/* Side Tab Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-1/2 -translate-y-1/2 right-0 z-50 bg-primary text-white rounded-l-xl shadow-xl hover:bg-primary/90 transition-all flex flex-col items-center justify-center gap-2 py-5 px-3 group"
        aria-label="Toggle Support Chat"
      >
        <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-bold tracking-wider" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
          SUPPORT
        </span>
      </button>

      {/* Support Drawer / Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 -translate-y-1/2 right-12 z-50 w-[290px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/90 px-3.5 py-3 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-white/20 ring-2 ring-white/30 flex items-center justify-center font-bold text-xs">
                    KK
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-primary" />
                </div>
                <div>
                  <p className="font-bold text-xs flex items-center gap-1">
                    KKIT Support <CheckCircle2 className="h-3 w-3 text-emerald-300 fill-emerald-300/20" />
                  </p>
                  <p className="text-[10px] text-white/80">Avg response: ~5 mins</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="px-3.5 py-3 bg-muted/20 space-y-3">
              <div className="flex gap-2 items-start">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="bg-background rounded-xl p-2.5 border border-border shadow-xs max-w-[85%]">
                  <p className="text-xs text-foreground font-medium">
                    Hello! How can our team assist you today?
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Send a quick message or chat directly on WhatsApp for instant assistance.
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Action Button with Avatar SVG */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-600/20 active:scale-[0.98]"
                >
                  <div className="p-1 rounded-full bg-white/20 flex items-center justify-center">
                    <WhatsAppIcon className="h-4 w-4 fill-white" />
                  </div>
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* In-app Message Input */}
            <form onSubmit={handleSubmit} className="px-3 py-2.5 border-t border-border bg-background">
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
                  className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0 shadow-sm"
                  aria-label="Send"
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
