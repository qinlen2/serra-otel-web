"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface LightboxProps {
  images: { url: string; alt: string }[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

function LightboxContent({ images, initialIndex = 0, open, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  const prev = useCallback(() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1)), [images.length]);
  const next = useCallback(() => setIndex((i) => (i === images.length - 1 ? 0 : i + 1)), [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, prev, next]);

  // Clamp index to valid range
  const safeIndex = images.length > 0 ? Math.min(index, images.length - 1) : 0;
  const currentImage = images[safeIndex];

  // Lock scroll
  useEffect(() => {
    if (!open) return;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && currentImage && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}
            className="rounded-full bg-white/10 p-2.5 text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
            aria-label="Kapat"
          >
            <X size={22} />
          </button>

          {/* Counter */}
          <div
            style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}
            className="rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white/70 backdrop-blur-md"
          >
            {safeIndex + 1} / {images.length}
          </div>

          {/* Main image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "min(88vw, 1100px)",
                height: "min(80vh, 800px)",
                margin: "auto",
              }}
            >
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
                className="rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
                aria-label="Önceki"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
                className="rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
                aria-label="Sonraki"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 10 }} className="flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === safeIndex ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Fotoğraf ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Lightbox(props: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use React Portal to render at document.body level — escapes all stacking contexts
  if (!mounted) return null;
  return createPortal(<LightboxContent {...props} />, document.body);
}
