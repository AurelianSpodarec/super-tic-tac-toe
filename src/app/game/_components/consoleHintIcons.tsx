'use client';

import type { SVGProps } from "react";

export function EnterHintIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 1.059v10.425m0 0 4-3.791m-4 3.79-4-3.79m11 3.79v2.844c0 .502-.21.985-.586 1.34a2.06 2.06 0 0 1-1.414.555H3c-.53 0-1.04-.2-1.414-.555A1.85 1.85 0 0 1 1 14.327v-2.843"
      ></path>
    </svg>
  );
}

export function NavigateHintIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" {...props}>
      <path d="m16 8-3-3v2H9V3h2L8 0 5 3h2v4H3V5L0 8l3 3V9h4v4H5l3 3 3-3H9V9h4v2z"></path>
    </svg>
  );
}

export function KeyLabel({ label }: { label: string }) {
  return <span className="font-mono leading-none">{label}</span>;
}
