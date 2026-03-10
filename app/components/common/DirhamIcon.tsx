import React from "react";

export default function DirhamIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg viewBox="0 0 100 100" fill="none" {...props}>
      {/* D shape */}
      <path
        d="M30 10 V90 M30 10 C75 10 85 35 85 50 C85 65 75 90 30 90"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* middle lines */}
      <line
        x1="20"
        y1="45"
        x2="75"
        y2="45"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />

      <line
        x1="20"
        y1="60"
        x2="75"
        y2="60"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}