import React from "react";

type GlassCardProps = {
  className?: string;
  children: React.ReactNode;
};

export default function GlassCard({ className = "", children }: GlassCardProps) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.03)] " +
        className
      }
    >
      {children}
    </div>
  );
}
