"use client";

import { motion, type Variant, type Variants } from "framer-motion";
import type { PropsWithChildren } from "react";

type RevealVariant = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleUp" | "blurUp";

interface RevealProps extends PropsWithChildren {
  /** Animation preset – defaults to "fadeUp" */
  variant?: RevealVariant;
  /** Extra delay in seconds (stacks with base) */
  delay?: number;
  /** Class name forwarded to wrapper */
  className?: string;
}

const presets: Record<RevealVariant, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 48, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  blurUp: {
    hidden: { opacity: 0, y: 32, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

export function Reveal({ children, variant = "fadeUp", delay = 0, className }: RevealProps) {
  const preset = presets[variant];
  const variants: Variants = {
    hidden: preset.hidden,
    visible: {
      ...preset.visible,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its children via Reveal */
export function RevealGroup({
  children,
  stagger = 0.08,
  className,
}: PropsWithChildren<{ stagger?: number; className?: string }>) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Individual child of RevealGroup – animates automatically */
export function RevealItem({
  children,
  variant = "fadeUp",
  className,
}: PropsWithChildren<{ variant?: RevealVariant; className?: string }>) {
  const preset = presets[variant];
  const variants: Variants = {
    hidden: preset.hidden,
    visible: {
      ...preset.visible,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
