import { useState, useEffect, useCallback } from 'react';

export type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroConfig {
  workDuration: number; // in minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
}

const DEFAULT_CONFIG: PomodoroConfig = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
};

export function usePomodoro(config: PomodoroConfig = DEFAULT_CONFIG) {
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [timeLeft, setTimeLeft] = useState(config.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  const getDuration = useCallback((currentMode: PomodoroMode) => {
    switch (currentMode) {
      case 'work':
        return config.workDuration * 60;
      case 'shortBreak':
        return config.shortBreakDuration * 60;
      case 'longBreak':
        return config.longBreakDuration * 60;
    }
  }, [config]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Auto-switch to next mode
      if (mode === 'work') {
        const newSessionCount = sessionCount + 1;
        setSessionCount(newSessionCount);
        
        if (newSessionCount % config.sessionsUntilLongBreak === 0) {
          setMode('longBreak');
          setTimeLeft(getDuration('longBreak'));
        } else {
          setMode('shortBreak');
          setTimeLeft(getDuration('shortBreak'));
        }
      } else {
        setMode('work');
        setTimeLeft(getDuration('work'));
      }
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, sessionCount, config, getDuration]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getDuration(mode));
  }, [mode, getDuration]);

  const switchMode = useCallback((newMode: PomodoroMode) => {
    setMode(newMode);
    setTimeLeft(getDuration(newMode));
    setIsRunning(false);
  }, [getDuration]);

  const formatTime = useCallback(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timeLeft]);

  return {
    mode,
    timeLeft,
    isRunning,
    sessionCount,
    start,
    pause,
    reset,
    switchMode,
    formatTime,
  };
}
