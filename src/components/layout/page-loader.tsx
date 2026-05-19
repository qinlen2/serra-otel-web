"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { safeStorageGet, safeStorageSet } from "@/lib/utils/browser-storage";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check sessionStorage to only show once per session
    const hasLoaded = safeStorageGet("session", "serra-loaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setLoading(false);
      safeStorageSet("session", "serra-loaded", "1");
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--background)]"
        >
          {/* Serra logo reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Brand name */}
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="serif-heading text-5xl text-[var(--foreground)] md:text-6xl"
            >
              Serra
            </motion.h1>
            
            {/* Divider line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-4 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-[var(--brand-gold)]" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--brand-gold)]"
              >
                Otel · Urla
              </motion.span>
              <span className="h-px w-10 bg-[var(--brand-gold)]" />
            </motion.div>

            {/* Loading bar */}
            <div className="mx-auto mt-8 h-[2px] w-32 overflow-hidden rounded-full bg-[var(--line)]">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                className="h-full w-full rounded-full bg-[var(--brand-gold)]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
