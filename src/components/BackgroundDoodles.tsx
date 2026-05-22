"use client";

import React from "react";
import Image from "next/image";

export default function BackgroundDoodles() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      
      {/* 25k Note - Single Copy (Left) */}
      <div className="absolute top-1/4 -left-10 transform -rotate-12 w-[30rem] h-[14rem] drop-shadow-[15px_15px_0px_rgba(0,0,0,0.1)] opacity-90 transition-transform duration-1000 ease-in-out hover:rotate-0 hover:scale-105">
        {/* Using the real user-uploaded image which has no fake checkerboard */}
        <Image src="/real_25k.jpg" alt="25k" fill className="object-contain rounded-2xl" unoptimized />
      </div>

      {/* 10k Note - Single Copy (Right) */}
      <div className="absolute bottom-1/4 -right-10 transform rotate-12 w-[28rem] h-[13rem] drop-shadow-[15px_15px_0px_rgba(0,0,0,0.1)] opacity-90 transition-transform duration-1000 ease-in-out hover:rotate-0 hover:scale-105">
         {/* Using the real user-uploaded image which has no fake checkerboard */}
        <Image src="/real_10k.jpg" alt="10k" fill className="object-contain rounded-2xl" unoptimized />
      </div>

      {/* Hourglass */}
      <div className="absolute top-1/4 left-1/3 transform -rotate-12 w-28 h-28 opacity-90 drop-shadow-lg">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 10 L 80 10 L 80 20 L 55 50 L 80 80 L 80 90 L 20 90 L 20 80 L 45 50 L 20 20 Z" fill="#F9F9F7" stroke="#000" strokeWidth="6" strokeLinejoin="round" />
          <path d="M 25 15 L 75 15 L 75 20 L 55 45 L 45 45 L 25 20 Z" fill="#fff" />
          <path d="M 45 55 L 55 55 L 65 85 L 35 85 Z" fill="#fff" />
          <line x1="50" y1="45" x2="50" y2="70" stroke="#000" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Coins (IQD & Euro) */}
      <div className="absolute top-1/3 left-20 transform -rotate-12 w-16 h-16 drop-shadow-lg">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#eab308" stroke="#000" strokeWidth="6" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4 4" />
          <text x="50" y="60" fontFamily="sans-serif" fontSize="24" fontWeight="900" fill="#000" textAnchor="middle">IQD</text>
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-1/3 transform rotate-12 w-16 h-16 drop-shadow-lg">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#eab308" stroke="#000" strokeWidth="6" />
          <text x="50" y="60" fontFamily="sans-serif" fontSize="32" fontWeight="900" fill="#000" textAnchor="middle">$</text>
        </svg>
      </div>
      <div className="absolute top-1/4 right-1/4 transform -rotate-12 w-16 h-16 drop-shadow-lg">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#22c55e" stroke="#000" strokeWidth="6" />
          <text x="50" y="60" fontFamily="sans-serif" fontSize="32" fontWeight="900" fill="#000" textAnchor="middle">€</text>
        </svg>
      </div>
      <div className="absolute bottom-1/3 right-1/4 transform rotate-12 w-16 h-16 drop-shadow-lg">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#ef4444" stroke="#000" strokeWidth="6" />
          <text x="50" y="60" fontFamily="sans-serif" fontSize="32" fontWeight="900" fill="#000" textAnchor="middle">€</text>
        </svg>
      </div>

      {/* Doodle Arrows */}
      <div className="absolute top-1/3 right-1/3 transform rotate-12 w-24 h-24 drop-shadow-md">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 50 Q 50 20 80 50" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" />
          <path d="M 65 35 L 80 50 L 60 60" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 left-1/4 transform -rotate-45 w-24 h-24 drop-shadow-md">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 80 Q 50 50 80 20" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" />
          <path d="M 60 20 L 80 20 L 80 40" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Handshake */}
      <div className="absolute bottom-1/5 right-1/3 transform -rotate-6 w-32 h-32 drop-shadow-lg">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 70 L 30 50 L 45 65 L 25 85 Z" fill="#F9F9F7" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          <path d="M 90 30 L 70 50 L 55 35 L 75 15 Z" fill="#F9F9F7" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          <path d="M 30 50 Q 50 30 70 50" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
          <path d="M 45 65 Q 65 45 55 35" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

    </div>
  );
}
