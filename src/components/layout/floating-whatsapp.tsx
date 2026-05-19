"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

import { usePreferences } from "@/components/layout/preference-provider";
import { getWhatsAppUrl } from "@/lib/data/site";
import { cn } from "@/lib/utils/cn";

const quickReplies = {
  tr: [
    "Müsait odalarınız var mı?",
    "Fiyat bilgisi alabilir miyim?",
    "Check-in saati kaçtır?",
    "Kahvaltı dahil mi?",
  ],
  en: [
    "Do you have available rooms?",
    "Can I get pricing info?",
    "What is the check-in time?",
    "Is breakfast included?",
  ],
  de: [
    "Haben Sie verfügbare Zimmer?",
    "Kann ich Preisinformationen bekommen?",
    "Wann ist der Check-in?",
    "Ist Frühstück inklusive?",
  ],
};

export function FloatingWhatsApp() {
  const { language } = usePreferences();
  const [showBubble, setShowBubble] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowBubble(true);
    };
    const timeout = setTimeout(() => setShowBubble(true), 4000);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (chatOpen && inputRef.current) inputRef.current.focus();
  }, [chatOpen]);

  const copy = {
    tr: {
      greeting: "Merhaba! 👋",
      subtitle: "Serra Otel",
      online: "Çevrimiçi",
      body: "Size nasıl yardımcı olabiliriz? Rezervasyon, oda bilgisi veya herhangi bir sorunuz için yazın.",
      placeholder: "Mesajınızı yazın...",
      quickLabel: "Hızlı sorular:",
      powered: "WhatsApp ile iletişim",
    },
    en: {
      greeting: "Hello! 👋",
      subtitle: "Serra Hotel",
      online: "Online",
      body: "How can we help you? Write us about reservations, room info or any question.",
      placeholder: "Type your message...",
      quickLabel: "Quick questions:",
      powered: "Chat via WhatsApp",
    },
    de: {
      greeting: "Hallo! 👋",
      subtitle: "Serra Hotel",
      online: "Online",
      body: "Wie können wir helfen? Schreiben Sie uns zu Reservierungen, Zimmerinfos oder Fragen.",
      placeholder: "Ihre Nachricht...",
      quickLabel: "Schnelle Fragen:",
      powered: "Chat über WhatsApp",
    },
  }[language];

  const replies = quickReplies[language];

  function openWhatsApp(text?: string) {
    const msg = text || message || "";
    const url = msg
      ? `https://wa.me/905413738420?text=${encodeURIComponent(msg)}`
      : getWhatsAppUrl(language, "konaklama");
    window.open(url, "_blank", "noopener,noreferrer");
    if (!text) setMessage("");
  }

  return (
    <>
      <AnimatePresence>
        {/* Chat Panel */}
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "fixed z-[60] right-4 md:right-8 w-[340px] sm:w-[370px] rounded-2xl overflow-hidden shadow-2xl border border-[var(--line)]",
              "bottom-[140px] lg:bottom-24"
            )}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#075E54] to-[#128C7E] px-5 py-4 text-white">
              <button
                onClick={() => setChatOpen(false)}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white/80 backdrop-blur-sm hover:bg-white/25 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                    S
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#075E54] bg-[#25D366]" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold">{copy.subtitle}</p>
                  <p className="text-[11px] font-medium text-white/70">{copy.online}</p>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="bg-[#ECE5DD] px-4 py-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cfc6' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
              {/* Incoming message bubble */}
              <div className="max-w-[85%]">
                <div className="rounded-xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                  <p className="text-[14px] font-semibold text-[#075E54]">{copy.greeting}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-gray-700">{copy.body}</p>
                  <p className="mt-2 text-right text-[10px] text-gray-400">
                    {new Date().toLocaleTimeString(language === "tr" ? "tr-TR" : language === "de" ? "de-DE" : "en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>

              {/* Quick replies */}
              <div className="mt-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">{copy.quickLabel}</p>
                <div className="flex flex-wrap gap-1.5">
                  {replies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => openWhatsApp(reply)}
                      className="rounded-full border border-[#25D366]/30 bg-white px-3 py-1.5 text-[12px] font-medium text-[#075E54] shadow-sm transition-all hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-md active:scale-95"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2 border-t border-gray-200 bg-white px-3 py-2.5">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && message.trim() && openWhatsApp()}
                placeholder={copy.placeholder}
                className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#25D366]/50 focus:ring-2 focus:ring-[#25D366]/20 transition-all"
              />
              <button
                onClick={() => message.trim() && openWhatsApp()}
                disabled={!message.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-all hover:bg-[#128C7E] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed active:scale-90"
              >
                <Send size={16} />
              </button>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-100 px-4 py-1.5 text-center">
              <span className="text-[10px] font-medium text-gray-400">{copy.powered}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={cn(
              "fixed z-50 right-4 md:right-8",
              "bottom-[80px] lg:bottom-8"
            )}
          >
            <button
              onClick={() => setChatOpen((prev) => !prev)}
              className={cn(
                "group relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95",
                chatOpen
                  ? "bg-gray-600 hover:bg-gray-700"
                  : "bg-[#25D366] hover:bg-[#128C7E]"
              )}
            >
              <AnimatePresence mode="wait">
                {chatOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={24} className="text-white" />
                  </motion.div>
                ) : (
                  <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <MessageCircle size={24} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Ping animation when closed */}
              {!chatOpen && (
                <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" />
              )}

              {/* Notification dot */}
              {!chatOpen && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm">
                  1
                </span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
