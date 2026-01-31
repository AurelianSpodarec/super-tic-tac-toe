import Link from "next/link";
import React from "react";

type NeonButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function NeonButton({
  href,
  children,
  variant = "primary",
  className = "",
}: NeonButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef476f]/70 focus-visible:ring-offset-0";

  const styles =
    variant === "primary"
      ? "border border-[#ef476f]/60 bg-[#ef476f]/20 hover:bg-[#ef476f]/25 text-gray-50 shadow-[0_0_40px_rgba(239,71,111,0.18)]"
      : "border border-white/15 bg-white/5 hover:bg-white/10 text-gray-100";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
