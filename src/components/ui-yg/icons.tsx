"use client";

import * as React from "react";

/**
 * Custom SVG icon system — one stroke language, one viewBox.
 */

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

export function IconArrowRight({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M5 12h13" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowDown({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 5v13" />
      <path d="M6 13l6 6 6-6" />
    </svg>
  );
}

export function IconArrowLeft({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M19 12H6" />
      <path d="M11 18L5 12l6-6" />
    </svg>
  );
}

export function IconExternal({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M14 5h5v5" />
      <path d="M19 5l-9 9" />
      <path d="M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5" />
    </svg>
  );
}

export function IconMail({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function IconGitHub({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-3.5a3 3 0 00-1-2.4c3 0 6-2 6-5.5a4 4 0 00-1.1-2.8 4 4 0 00-.1-2.8s-1-.3-3.3 1.3a11 11 0 00-6 0C6.2 3.3 5.2 3.6 5.2 3.6a4 4 0 00-.1 2.8A4 4 0 004 9.2c0 3.5 3 5.5 6 5.5a3 3 0 00-1 2.4V22" />
    </svg>
  );
}

export function IconLinkedIn({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v6M8 7v.01M12 16v-4a2 2 0 014 0v4" />
    </svg>
  );
}

export function IconLocation({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconLive({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1.5 1.5" />
      <path d="M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1.5-1.5" />
    </svg>
  );
}

export function IconRepo({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M5 4a1 1 0 011-1h12a1 1 0 011 1v15a2 2 0 00-2-2H6a1 1 0 01-1-1z" />
      <path d="M5 4v13a2 2 0 002 2h12" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconMenu({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}

export function IconClose({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconSkip({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M5 4l10 8-10 8z" />
      <rect x="17" y="4" width="2" height="16" />
    </svg>
  );
}

/** Y/G monogram — small optional signature. */
export function YGMark({ size = 28, ...p }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      focusable={false}
      {...p}
    >
      <path d="M5 5l11 8 11-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 13v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M22 20a6 6 0 11-4-10 6 6 0 015 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 13v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
