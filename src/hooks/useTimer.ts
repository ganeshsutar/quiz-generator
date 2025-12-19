import { useState, useEffect, useCallback, useRef } from "react";

interface UseTimerOptions {
  duration: number; // in seconds
  onExpire?: () => void;
  autoStart?: boolean;
}

interface UseTimerReturn {
  timeRemaining: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  restart: (newDuration?: number) => void;
}

export function useTimer({
  duration,
  onExpire,
  autoStart = true,
}: UseTimerOptions): UseTimerReturn {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<number | null>(null);
  const onExpireRef = useRef(onExpire);

  // Keep the callback ref up to date
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setTimeRemaining(duration);
    setIsRunning(false);
  }, [duration, clearTimer]);

  const restart = useCallback(
    (newDuration?: number) => {
      clearTimer();
      setTimeRemaining(newDuration ?? duration);
      setIsRunning(true);
    },
    [duration, clearTimer]
  );

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearTimer();
            setIsRunning(false);
            onExpireRef.current?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return clearTimer;
  }, [isRunning, timeRemaining, clearTimer]);

  return {
    timeRemaining,
    isRunning,
    start,
    pause,
    reset,
    restart,
  };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
