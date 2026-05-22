"use client";

import { motion } from "framer-motion";

interface TimeCostClockProps {
  hours: number;
  minutes: number;
}

export default function TimeCostClock({ hours, minutes }: TimeCostClockProps) {
  const hasTime = hours > 0 || minutes > 0;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <motion.div
        animate={{ rotate: hasTime ? [0, 180] : 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
        className="relative mb-8"
      >
        <svg width="120" height="150" viewBox="0 0 80 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
          <path d="M 20 10 L 60 10 L 60 20 C 60 30 50 40 40 50 C 30 40 20 30 20 20 Z" />
          <path d="M 40 50 C 50 60 60 70 60 80 L 60 90 L 20 90 L 20 80 C 20 70 30 60 40 50 Z" />
          
          <motion.path 
            d="M 25 20 L 55 20 C 55 28 48 35 40 45 C 32 35 25 28 25 20 Z" 
            fill="var(--accent)"
            stroke="none"
            initial={{ opacity: 1 }}
            animate={{ opacity: hasTime ? 0.2 : 1, y: hasTime ? 5 : 0 }}
          />
          <motion.path 
            d="M 40 55 C 48 65 55 72 55 80 L 55 85 L 25 85 L 25 80 C 25 72 32 65 40 55 Z" 
            fill="var(--accent)"
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: hasTime ? 1 : 0, y: hasTime ? 0 : 5 }}
          />
          <motion.line 
            x1="40" y1="45" x2="40" y2="80" 
            stroke="var(--accent)" 
            strokeWidth="2" strokeDasharray="4 4"
            animate={{ strokeDashoffset: hasTime ? [0, -20] : 0 }}
            transition={{ repeat: hasTime ? Infinity : 0, duration: 1, ease: "linear" }}
          />
        </svg>
      </motion.div>

      <div className="text-center z-10" dir="rtl">
        <div className="text-7xl font-black mb-2 tracking-tighter text-accent">
          {hours > 0 && <>{hours}<span className="text-3xl font-bold ml-1 mr-3 opacity-60">س</span></>}
          {minutes}<span className="text-3xl font-bold ml-1 opacity-60">د</span>
        </div>
        <p className="text-xl font-bold opacity-70 text-accent">العمل المعادل</p>
      </div>
    </div>
  );
}
