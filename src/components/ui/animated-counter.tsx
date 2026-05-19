"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  /** Decimal places to show */
  decimals?: number;
  /** Text suffix like "+" or "/5" */
  suffix?: string;
  /** Text prefix like "₺" */
  prefix?: string;
  /** Duration in seconds */
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => {
    return `${prefix}${v.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [isInView, value, duration, motionVal]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
}
