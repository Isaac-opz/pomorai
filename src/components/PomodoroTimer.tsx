'use client';

import { usePomodoro, PomodoroMode } from '@/hooks/usePomodoro';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function PomodoroTimer() {
  const {
    mode,
    isRunning,
    sessionCount,
    start,
    pause,
    reset,
    switchMode,
    formatTime,
  } = usePomodoro();

  const getModeColor = (currentMode: PomodoroMode) => {
    switch (currentMode) {
      case 'work':
        return 'bg-red-500';
      case 'shortBreak':
        return 'bg-green-500';
      case 'longBreak':
        return 'bg-blue-500';
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
    <div className="flex flex-col items-center space-y-8">
      <div className="flex space-x-2">
        <button
          onClick={() => switchMode('work')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'work'
              ? 'bg-red-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Work
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'shortBreak'
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'longBreak'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Long Break
        </button>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">
          {getModeText(mode)}
        </h2>
        <div
          className={`${getModeColor(mode)} rounded-full w-80 h-80 flex items-center justify-center shadow-2xl`}
        >
          <div className="text-8xl font-bold text-white">{formatTime()}</div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {!isRunning ? (
          <button
            onClick={start}
            className="bg-white text-gray-900 p-6 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          >
            <Play className="w-8 h-8" fill="currentColor" />
          </button>
        ) : (
          <button
            onClick={pause}
            className="bg-white text-gray-900 p-6 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          >
            <Pause className="w-8 h-8" fill="currentColor" />
          </button>
        )}
        <button
          onClick={reset}
          className="bg-gray-700 text-white p-6 rounded-full hover:bg-gray-600 transition-colors shadow-lg"
        >
          <RotateCcw className="w-8 h-8" />
        </button>
      </div>

      <div className="text-gray-400 text-sm">
        Sessions completed: {sessionCount}
      </div>
    </div>
  );
}
