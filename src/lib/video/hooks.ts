import { useState, useEffect, useRef } from 'react';

interface UseVideoPlayerOptions {
  durations: Record<string, number>;
}

interface UseVideoPlayerResult {
  currentScene: number;
}

export function useVideoPlayer({ durations }: UseVideoPlayerOptions): UseVideoPlayerResult {
  const [currentScene, setCurrentScene] = useState(0);
  const keys = Object.keys(durations);
  const totalScenes = keys.length;
  const hasRecorded = useRef(false);
  const totalDuration = Object.values(durations).reduce((a, b) => a + b, 0);

  useEffect(() => {
    (window as any).startRecording?.();

    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    keys.forEach((key, i) => {
      const t = setTimeout(() => {
        setCurrentScene(i);
        if (i === totalScenes - 1 && !hasRecorded.current) {
          const stopDelay = setTimeout(() => {
            (window as any).stopRecording?.();
            hasRecorded.current = true;
          }, durations[key]);
          timers.push(stopDelay);
        }
      }, elapsed);
      timers.push(t);
      elapsed += durations[key];
    });

    const loopTimer = setInterval(() => {
      elapsed = 0;
      keys.forEach((key, i) => {
        const t = setTimeout(() => {
          setCurrentScene(i);
        }, elapsed);
        timers.push(t);
        elapsed += durations[key];
      });
    }, totalDuration);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loopTimer);
    };
  }, []);

  return { currentScene };
}

export function useSceneTimer(duration: number, onComplete?: () => void) {
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), duration);
    return () => clearTimeout(t);
  }, [duration]);
}
