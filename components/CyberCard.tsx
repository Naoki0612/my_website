import type { ReactNode } from "react";

export function CyberCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`cyber-panel neon-border cyber-card rounded-lg p-5 ${className}`}>{children}</article>;
}
