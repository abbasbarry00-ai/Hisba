"use client";

import { motion } from "framer-motion";

export default function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <motion.div 
      className={`flex justify-center items-center opacity-40 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 0.4, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <svg width="40" height="120" viewBox="0 0 40 120" fill="none" stroke="var(--foreground)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <motion.path 
          d="M 20,0 Q 30,40 10,80 T 20,115" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path 
          d="M 5,100 L 20,115 L 35,95" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        />
      </svg>
    </motion.div>
  );
}
