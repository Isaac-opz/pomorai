'use client';

import { usePomodoro, PomodoroMode } from '@/hooks/usePomodoro';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { GlassButton, ModeButton } from '@/components/ui';

export function PomodoroTimer() {
  const {
    mode,
    isRunning,
    sessionCount,
    start,
    pause,
    reset,
    requestModeChange,
    formatTime,
  } = usePomodoro();

  const getModeColor = (currentMode: PomodoroMode) => {
    switch (currentMode) {
      case 'work':
        return 'bg-focus-red';
      case 'shortBreak':
        return 'bg-break-green';
      case 'longBreak':
        return 'bg-break-blue';
    }
  };

  const getModeGlow = (currentMode: PomodoroMode) => {
    switch (currentMode) {
      case 'work':
        return 'glow-focus';
      case 'shortBreak':
        return 'glow-break-short';
      case 'longBreak':
        return 'glow-break-long';
    }
  };

  const getModeText = (currentMode: PomodoroMode) => {
    switch (currentMode) {
      case 'work':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      {/* Mode Selection */}
      <div className="flex gap-3">
        <ModeButton
          mode="work"
          active={mode === 'work'}
          onClick={() => requestModeChange('work')}
        >
          Work
        </ModeButton>
        <ModeButton
          mode="shortBreak"
          active={mode === 'shortBreak'}
          onClick={() => requestModeChange('shortBreak')}
        >
          Short Break
        </ModeButton>
        <ModeButton
          mode="longBreak"
          active={mode === 'longBreak'}
          onClick={() => requestModeChange('longBreak')}
        >
          Long Break
        </ModeButton>
      </div>

      {/* Timer Display */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white/80 mb-6 tracking-wide">
          {getModeText(mode)}
        </h2>
        
        {/* Glass Timer Circle with Glow Effect */}
        <div className="relative">
          <div
            className={`
              ${getModeColor(mode)} 
              ${isRunning ? getModeGlow(mode) : ''}
              rounded-full 
              w-80 h-80 
              flex items-center justify-center 
              transition-all duration-500
              glass-card
              border-4 border-white/10
            `}
          >
            <div className="text-8xl font-bold text-white tracking-tight">
              {formatTime()}
            </div>
          </div>
          
          {/* Subtle pulse ring when active */}
          {isRunning && (
            <div className={`
              absolute inset-0 
              rounded-full 
              ${getModeColor(mode)}
              opacity-30
              animate-ping
              pointer-events-none
            `} 
            style={{ animationDuration: '2s' }}
            />
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-5">
        {!isRunning ? (
          <GlassButton
            variant="solid"
            size="xl"
            onClick={start}
            className="rounded-full p-6 hover:scale-105 transition-transform"
          >
            <Play className="w-9 h-9" fill="currentColor" />
          </GlassButton>
        ) : (
          <GlassButton
            variant="solid"
            size="xl"
            onClick={pause}
            className="rounded-full p-6 hover:scale-105 transition-transform"
          >
            <Pause className="w-9 h-9" fill="currentColor" />
          </GlassButton>
        )}
        
        <GlassButton
          variant="glass"
          size="xl"
          onClick={reset}
          className="rounded-full p-6 hover:scale-105 transition-transform"
        >
          <RotateCcw className="w-9 h-9" />
        </GlassButton>
      </div>

      {/* Session Counter */}
      <div className="glass-panel px-6 py-3 rounded-full">
        <p className="text-white/70 text-sm font-medium tracking-wide">
          Sessions completed: <span className="text-spotify-green font-bold">{sessionCount}</span>
        </p>
      </div>
    </div>
  );
}
