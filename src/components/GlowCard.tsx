import type { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'orange' | 'green' | 'purple';
  onClick?: () => void;
}

const glowMap = {
  cyan: 'glow-cyan',
  orange: 'glow-orange',
  green: 'glow-green',
  purple: 'glow-purple',
};

export function GlowCard({ children, className = '', glowColor, onClick }: GlowCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-border bg-card p-4 transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-primary/50 active:scale-[0.98]' : ''
      } ${glowColor ? glowMap[glowColor] : ''} ${className}`}
    >
      {children}
    </div>
  );
}
