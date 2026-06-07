"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

interface AnimatedStatProps {
  /** Numeric target to count up to. If omitted, `label` is shown statically. */
  value?: number;
  /** Suffix after the number, e.g. "+" */
  suffix?: string;
  /** Big label when there is no number (e.g. "Global Trading") */
  staticValue?: string;
  /** Caption under the figure */
  caption: string;
}

/**
 * Animated statistic. Counts up when scrolled into view if `value` is given,
 * otherwise renders `staticValue` text. Uses only safe, non-fake figures.
 */
export default function AnimatedStat({
  value,
  suffix = "",
  staticValue,
  caption,
}: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value !== undefined && inView) {
      const controls = animate(count, value, { duration: 1.6, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, count]);

  useEffect(() => rounded.on("change", (v) => setDisplay(v)), [rounded]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {value !== undefined ? (
          <motion.span>{display}</motion.span>
        ) : (
          <span>{staticValue}</span>
        )}
        {suffix}
      </div>
      <p className="mt-2 text-xs font-medium uppercase tracking-wider text-blue-300 sm:text-sm">
        {caption}
      </p>
    </div>
  );
}
