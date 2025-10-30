"use client";

import React from "react";

export default function LogoText() {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary flex-shrink-0"
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="16"
          cy="16"
          r="8"
          stroke="url(#gradient2)"
          strokeWidth="2.5"
          fill="none"
        />
        <circle
          cx="16"
          cy="16"
          r="2"
          fill="url(#gradient3)"
        />
        <line
          x1="16"
          y1="4"
          x2="16"
          y2="8"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="16"
          y1="24"
          x2="16"
          y2="28"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="4"
          y1="16"
          x2="8"
          y2="16"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="24"
          y1="16"
          x2="28"
          y2="16"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#20b8cd" />
            <stop offset="100%" stopColor="#1a9fb3" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#20b8cd" />
            <stop offset="50%" stopColor="#1a9fb3" />
            <stop offset="100%" stopColor="#20b8cd" />
          </linearGradient>
          <radialGradient id="gradient3">
            <stop offset="0%" stopColor="#20b8cd" />
            <stop offset="100%" stopColor="#1a9fb3" />
          </radialGradient>
        </defs>
      </svg>
      <div className="flex flex-col">
        <span className="text-xl font-semibold tracking-tight text-white">
          GoZeroing
        </span>
        <span className="text-xs font-medium tracking-wider text-primary uppercase">
          Pro
        </span>
      </div>
    </div>
  );
}
