import { ReactNode } from 'react';

/**
 * GlassPanel Component
 * 
 * A lightweight glass panel for nav bars, headers, and overlays.
 * Uses stronger blur and higher opacity than GlassCard.
 * 
 * @param children - Panel content
 * @param className - Additional Tailwind classes
 * @param position - Position variant (static, sticky, fixed)
 */
interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  position?: 'static' | 'sticky' | 'fixed';
}

export function GlassPanel({ children, className = '', position = 'static' }: GlassPanelProps) {
  const positionClasses = {
    static: '',
    sticky: 'sticky top-0 z-50',
    fixed: 'fixed top-0 left-0 right-0 z-50',
  };

  return (
    <div className={`glass-panel ${positionClasses[position]} ${className}`}>
      {children}
    </div>
  );
}
