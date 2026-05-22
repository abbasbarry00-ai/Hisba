"use client";

import React from "react";

export default function BackgroundDoodles() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-20">
      
      {/* 25k Red Note Doodle - Middle Left */}
      <div className="absolute top-1/4 -left-16 transform -rotate-12 w-96 h-48 drop-shadow-2xl opacity-80">
        <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Main brutalist outline */}
          <rect x="10" y="10" width="380" height="180" rx="8" fill="#F9F9F7" stroke="#000" strokeWidth="8" />
          <rect x="25" y="25" width="350" height="150" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="10 5" />
          
          {/* Decorative shapes (Mock security elements) */}
          <circle cx="80" cy="100" r="40" fill="none" stroke="#000" strokeWidth="6" />
          <circle cx="80" cy="100" r="25" fill="#ef4444" stroke="#000" strokeWidth="4" />
          
          {/* Central Crest */}
          <path d="M 180 50 L 220 50 L 240 100 L 220 150 L 180 150 L 160 100 Z" fill="none" stroke="#000" strokeWidth="6" />
          <path d="M 180 50 L 220 50 L 240 100 L 220 150 L 180 150 L 160 100 Z" fill="#ef4444" opacity="0.3" />
          
          {/* Typography placeholders (Vector ٢٥٠٠٠) */}
          <text x="270" y="70" fontFamily="sans-serif" fontSize="48" fontWeight="900" fill="#000" stroke="#ef4444" strokeWidth="2">٢٥٠٠٠</text>
          <text x="270" y="130" fontFamily="sans-serif" fontSize="24" fontWeight="900" fill="#000">عشرون وخمسة</text>
          <text x="270" y="160" fontFamily="sans-serif" fontSize="24" fontWeight="900" fill="#000">ألف دينار</text>
          
          {/* Geometric lines */}
          <line x1="160" y1="100" x2="80" y2="100" stroke="#000" strokeWidth="4" />
          <line x1="240" y1="100" x2="350" y2="100" stroke="#000" strokeWidth="4" />
        </svg>
      </div>

      {/* 10k Green Note Doodle - Top Right */}
      <div className="absolute top-10 -right-10 transform rotate-12 w-80 h-40 drop-shadow-2xl opacity-80">
        <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Main brutalist outline */}
          <rect x="10" y="10" width="380" height="180" rx="8" fill="#F9F9F7" stroke="#000" strokeWidth="8" />
          <rect x="25" y="25" width="350" height="150" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="10 5" />
          
          {/* Decorative shapes */}
          <path d="M 60 50 L 120 50 L 120 150 L 60 150 Z" fill="none" stroke="#000" strokeWidth="6" />
          <path d="M 60 50 L 120 50 L 120 150 L 60 150 Z" fill="#22c55e" opacity="0.3" />
          <circle cx="90" cy="100" r="15" fill="#000" />
          
          {/* Central geometric arch */}
          <path d="M 160 150 C 160 80 240 80 240 150" fill="none" stroke="#000" strokeWidth="6" />
          <path d="M 170 150 C 170 100 230 100 230 150" fill="none" stroke="#22c55e" strokeWidth="4" />
          
          {/* Typography placeholders (Vector ١٠٠٠٠) */}
          <text x="260" y="80" fontFamily="sans-serif" fontSize="56" fontWeight="900" fill="#000" stroke="#22c55e" strokeWidth="2">١٠٠٠٠</text>
          <text x="260" y="130" fontFamily="sans-serif" fontSize="28" fontWeight="900" fill="#000">عشرة آلاف</text>
        </svg>
      </div>

      {/* Contextual Doodle: Stylized Hourglass */}
      <div className="absolute bottom-32 left-10 transform rotate-6 w-32 h-32 opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 10 L 80 10 L 80 20 L 55 50 L 80 80 L 80 90 L 20 90 L 20 80 L 45 50 L 20 20 Z" fill="none" stroke="#000" strokeWidth="6" strokeLinejoin="round" />
          <path d="M 25 15 L 75 15 L 75 20 L 55 45 L 45 45 L 25 20 Z" fill="#ef4444" />
          <path d="M 45 55 L 55 55 L 65 85 L 35 85 Z" fill="#ef4444" opacity="0.5" />
          <line x1="50" y1="45" x2="50" y2="70" stroke="#ef4444" strokeWidth="4" strokeDasharray="4 2" />
        </svg>
      </div>

      {/* Contextual Doodle: IQD Neon Coin */}
      <div className="absolute top-1/2 right-20 transform -rotate-12 w-24 h-24 opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#F9F9F7" stroke="#000" strokeWidth="6" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#eab308" strokeWidth="4" strokeDasharray="8 4" />
          <text x="50" y="60" fontFamily="sans-serif" fontSize="28" fontWeight="900" fill="#000" textAnchor="middle">د.ع</text>
        </svg>
      </div>

      {/* Contextual Doodle: Stylized Clock */}
      <div className="absolute top-32 left-1/4 transform rotate-12 w-28 h-28 opacity-60">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#000" strokeWidth="6" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#22c55e" strokeWidth="4" />
          <line x1="50" y1="50" x2="50" y2="25" stroke="#000" strokeWidth="6" strokeLinecap="round" />
          <line x1="50" y1="50" x2="70" y2="60" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="50" r="6" fill="#000" />
        </svg>
      </div>

      {/* Contextual Doodle: Doodle Arrow */}
      <div className="absolute bottom-40 right-1/4 transform -rotate-45 w-32 h-32 opacity-50">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 80 Q 50 50 80 20" fill="none" stroke="#000" strokeWidth="8" strokeLinecap="round" />
          <path d="M 60 20 L 80 20 L 80 40" fill="none" stroke="#000" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 25 75 Q 50 45 75 25" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      {/* Contextual Doodle: Handshake (Consensus/Value) */}
      <div className="absolute bottom-10 right-10 transform -rotate-6 w-40 h-40 opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Sleeve 1 */}
          <path d="M 10 70 L 30 50 L 45 65 L 25 85 Z" fill="#F9F9F7" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          {/* Sleeve 2 */}
          <path d="M 90 30 L 70 50 L 55 35 L 75 15 Z" fill="#F9F9F7" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          {/* Hands interlocking abstractly */}
          <path d="M 30 50 Q 50 30 70 50" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" />
          <path d="M 45 65 Q 65 45 55 35" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="#eab308" strokeWidth="4" />
        </svg>
      </div>

    </div>
  );
}
