"use client";

import { BedDouble, ChevronDown, MapPin, MessageCircle, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { usePreferences } from "@/components/layout/preference-provider";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/data/site";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HeroSection() {
  const { t, language } = usePreferences();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const facts = [
    { label: t("heroRooms"), icon: BedDouble },
    { label: t("heroBoard"), icon: Utensils },
    { label: t("heroSea"), icon: MapPin },
  ];
  const titleWords = t("heroTitle").split(" ");

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden flex items-center">
      {/* Full-bleed background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
        <motion.div 
          className="absolute inset-0"
          animate={{ scale: [1, 1.05] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src="/serra/current/hero-final.png"
            alt="Serra Otel Urla dış cephe ve deniz manzarası"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        {/* Cinematic overlays - reduced intensity for vibrancy, left dark for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Warm Ege/Amber color grade */}
        <div className="absolute inset-0 bg-amber-500/20 mix-blend-overlay" />
      </motion.div>

      {/* Animated grain overlay for cinematic feel */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-28 md:px-8 md:py-36 lg:py-0">
        <div className="max-w-3xl">
          {/* Eyebrow with animated line */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="mb-8 md:mb-10 flex items-center gap-5"
          >
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1.5px] w-16 origin-left bg-gradient-to-r from-[var(--brand-gold)] to-transparent"
            />
            <motion.span 
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.5em] text-[var(--brand-gold)]"
            >
              Serra · Urla
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="serif-heading text-[2.8rem] leading-[1.05] text-white sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.2rem] !font-normal"
          >
            {titleWords.map((word, index) => (
              <motion.span 
                key={index} 
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6 md:mt-8 max-w-lg text-[15px] md:text-lg leading-relaxed text-white/70"
          >
            {t("heroText")}
          </motion.p>

          {/* Facts pills */}
          <div className="mt-8 md:mt-10 flex flex-wrap gap-2.5 md:gap-3">
            {facts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + i * 0.1 }}
                className="flex items-center gap-2 rounded-full border border-[var(--brand-gold)]/40 bg-[var(--brand-gold)]/15 px-4 py-2 text-[12px] md:text-[13px] font-medium text-white/95 backdrop-blur-md"
              >
                <fact.icon className="text-[var(--brand-gold)]" size={15} />
                <span>{fact.label}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-10 md:mt-12 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="bg-white text-[var(--brand-sea)] hover:bg-white/90 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 h-12 md:h-14 px-7 md:px-9 text-[14px] md:text-[15px] font-semibold w-full sm:w-auto">
              <Link href="/odalar">{t("viewRooms")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/15 rounded-full backdrop-blur-md hover:-translate-y-1 transition-all h-12 md:h-14 px-7 md:px-9 text-[14px] md:text-[15px] font-medium w-full sm:w-auto">
              <a href={getWhatsAppUrl(language)}>
                <MessageCircle size={18} className="mr-2 text-[#25D366]" />
                WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 lg:bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">{t("discover")}</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-white/40" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade to content - shorter and transitioning to cream/stone */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent z-[5]" />
    </section>
  );
}
