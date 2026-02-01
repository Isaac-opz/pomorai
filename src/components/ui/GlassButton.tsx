import { ReactNode, ButtonHTMLAttributes } from 'react';

/**
 * GlassButton Component
 * 
 * A reusable button component with liquid glass aesthetics.
 * Supports multiple variants: glass (default), spotify, solid.
 * 
 * @param children - Button content (text, icons, etc.)
 * @param variant - Visual style variant
 * @param size - Button size
 * @param className - Additional Tailwind classes
 * @param props - Native button HTML attributes
 */
interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'glass' | 'spotify' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function GlassButton({
  children,
  variant = 'glass',
  size = 'md',
  className = '',
  ...props
}: GlassButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  // Variant classes
  const variantClasses = {
    glass: 'glass-button text-white',
    spotify: 'btn-spotify text-white font-semibold',
    solid: 'bg-white text-black hover:bg-gray-100 transition-fast font-semibold shadow-lg',
    ghost: 'bg-transparent hover:bg-white/10 border border-white/20 text-white transition-fast',
  };

  return (
    <button
      className={`
        rounded-lg
        font-medium
        inline-flex
        items-center
        justify-center
        gap-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
