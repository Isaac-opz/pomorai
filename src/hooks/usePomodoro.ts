import { useState, useEffect, useCallback, useRef } from 'react';

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
  const [remainingTime, setRemainingTime] = useState(config.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  
  // Timestamp-based state
  const targetEndTimestamp = useRef<number | null>(null);
  const hasRequestedPermission = useRef(false);

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

  // Request notification permission on first start
  const requestNotificationPermission = useCallback(async () => {
    if (hasRequestedPermission.current) return;
    hasRequestedPermission.current = true;

    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  }, []);

  // Send notification when timer completes
  const sendNotification = useCallback((completedMode: PomodoroMode) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = completedMode === 'work' ? 'Work Session Complete!' : 'Break Time Over!';
      const body = completedMode === 'work' 
        ? 'Time for a break. Great work!' 
        : 'Ready to focus again?';

      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'pomodoro-timer',
        requireInteraction: false,
      });

      // Play audio notification (optional)
      if (typeof Audio !== 'undefined') {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZPQ0XZrjn7aVYEwpKo+PrwG8gBi6Czv');
        audio.play().catch(() => {}); // Ignore errors if audio fails
      }
    }
  }, []);

  // Calculate remaining time from timestamp
  const calculateRemainingTime = useCallback(() => {
    if (!targetEndTimestamp.current || !isRunning) {
      return remainingTime;
    }

    const now = Date.now();
    const remaining = Math.ceil((targetEndTimestamp.current - now) / 1000);
    
    return Math.max(0, remaining);
  }, [isRunning, remainingTime]);

  // Time-delta update loop (UI refresh only)
  useEffect(() => {
    if (!isRunning) return;

    // Throttle interval when page is hidden to save power
    const intervalTime = document.visibilityState === 'visible' ? 500 : 10000;

    const interval = setInterval(() => {
      const remaining = calculateRemainingTime();
      setRemainingTime(remaining);

      // Timer completed
      if (remaining <= 0) {
        setIsRunning(false);
        targetEndTimestamp.current = null;
        sendNotification(mode);

        // Auto-switch to next mode
        if (mode === 'work') {
          const newSessionCount = sessionCount + 1;
          setSessionCount(newSessionCount);
          
          if (newSessionCount % config.sessionsUntilLongBreak === 0) {
            setMode('longBreak');
            setRemainingTime(getDuration('longBreak'));
          } else {
            setMode('shortBreak');
            setRemainingTime(getDuration('shortBreak'));
          }
        } else {
          setMode('work');
          setRemainingTime(getDuration('work'));
        }
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isRunning, mode, sessionCount, config, getDuration, calculateRemainingTime, sendNotification]);

  // Page Visibility API - sync when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isRunning) {
        const remaining = calculateRemainingTime();
        setRemainingTime(remaining);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRunning, calculateRemainingTime]);

  const start = useCallback(() => {
    requestNotificationPermission();
    
    const now = Date.now();
    targetEndTimestamp.current = now + (remainingTime * 1000);
    setIsRunning(true);
  }, [remainingTime, requestNotificationPermission]);

  const pause = useCallback(() => {
    if (!isRunning) return;
    
    // Save current remaining time before pausing
    const remaining = calculateRemainingTime();
    setRemainingTime(remaining);
    targetEndTimestamp.current = null;
    setIsRunning(false);
  }, [isRunning, calculateRemainingTime]);

  const reset = useCallback(() => {
    setIsRunning(false);
    targetEndTimestamp.current = null;
    setRemainingTime(getDuration(mode));
  }, [mode, getDuration]);

  // Mode switching with confirmation guard
  const requestModeChange = useCallback((newMode: PomodoroMode) => {
    // If timer is not running, allow immediate switch
    if (!isRunning) {
      setMode(newMode);
      setRemainingTime(getDuration(newMode));
      targetEndTimestamp.current = null;
      return;
    }

    // Timer IS running - show confirmation
    const confirmed = window.confirm(
      'A session is currently running. Changing the mode will stop the timer. Continue?'
    );

    if (confirmed) {
      setIsRunning(false);
      targetEndTimestamp.current = null;
      setMode(newMode);
      setRemainingTime(getDuration(newMode));
    }
  }, [isRunning, getDuration]);

  const formatTime = useCallback(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [remainingTime]);

  return {
    mode,
    remainingTime,
    isRunning,
    sessionCount,
    start,
    pause,
    reset,
    requestModeChange,
    formatTime,
  };
}
