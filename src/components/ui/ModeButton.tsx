import { ReactNode, ButtonHTMLAttributes } from 'react';

/**
 * ModeButton Component
 * 
 * Specialized button for Pomodoro mode switching with semantic colors.
 * Supports work, shortBreak, and longBreak modes with corresponding styles.
 * 
 * @param children - Button content
 * @param mode - Pomodoro mode type
 * @param active - Whether this mode is currently active
 * @param className - Additional Tailwind classes
 * @param props - Native button HTML attributes
 */
interface ModeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  mode: 'work' | 'shortBreak' | 'longBreak';
  active: boolean;
  className?: string;
}

export function ModeButton({
  children,
  mode,
  active,
  className = '',
  ...props
}: ModeButtonProps) {
  // Mode-specific colors
  const modeColors = {
    work: active
      ? 'bg-focus-red text-white glow-focus'
      : 'glass-button text-white/70 hover:text-white',
    shortBreak: active
      ? 'bg-break-green text-white glow-break-short'
      : 'glass-button text-white/70 hover:text-white',
    longBreak: active
      ? 'bg-break-blue text-white glow-break-long'
      : 'glass-button text-white/70 hover:text-white',
  };

  return (
    <button
      className={`
        px-5 py-2.5
        rounded-xl
        font-semibold
        transition-all
        duration-300
        ${modeColors[mode]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
