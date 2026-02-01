import { ReactNode } from 'react';

/**
 * GlassCard Component
 * 
 * A reusable card component with liquid glass aesthetics.
 * Features backdrop blur, subtle borders, elevation, and smooth hover effects.
 * 
 * @param children - Card content
 * @param className - Additional Tailwind classes to apply
 * @param hover - Enable hover elevation effect (default: true)
 * @param onClick - Optional click handler for interactive cards
 */
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', hover = true, onClick }: GlassCardProps) {
  return (
    <div
      className={`glass-card rounded-xl ${hover ? '' : 'hover:transform-none hover:shadow-lg'} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
