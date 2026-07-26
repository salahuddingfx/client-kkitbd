"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Sparkles, CheckCircle2 } from "lucide-react";

export function FloatingWhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("Hi KKIT Team! I want to inquire about custom software / web development services.");
  const phone = "8801700000000"; // Replace with KKIT WhatsApp number

  const handleSend = () => {
    const encoded = encodeURIComponent(userMsg);
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Popup Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl bg-background border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  KK
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm">KKIT Digital Agency</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Online | Avg response: 5 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-muted/30 space-y-3">
            <div className="p-3 rounded-xl bg-background border text-xs text-foreground space-y-1">
              <p className="font-semibold text-emerald-600 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Welcome to KKIT!
              </p>
              <p className="text-muted-foreground">
                How can we help your business today? Select a service or send a direct inquiry on WhatsApp:
              </p>
            </div>

            <div className="space-y-1.5">
              {[
                "I want a Custom Web Application",
                "I need a Mobile App (iOS/Android)",
                "I want to discuss UI/UX Design",
              ].map((text) => (
                <button
                  key={text}
                  onClick={() => setUserMsg(`Hi KKIT! ${text}`)}
                  className="w-full text-left p-2 rounded-lg bg-background hover:bg-muted text-[11px] font-medium border transition-colors text-muted-foreground hover:text-foreground"
                >
                  💬 {text}
                </button>
              ))}
            </div>

            <textarea
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              rows={3}
              className="w-full p-2.5 text-xs rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              onClick={handleSend}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-4 rounded-full bg-emerald-500 text-white shadow-xl hover:bg-emerald-600 hover:scale-110 transition-all duration-300 flex items-center justify-center"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
        <MessageSquare className="h-6 w-6" />
      </button>
    </div>
  );
}
