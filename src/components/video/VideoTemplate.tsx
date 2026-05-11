import { motion } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { AnimatePresence } from 'framer-motion';

const SCENE_DURATIONS = {
  hook: 5000,
  setup: 10000,
  goal: 10000,
  table: 10000,
  cta: 7000
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({ durations: SCENE_DURATIONS });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0d1b3e]">
      {/* Background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="star" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              '--duration': `${Math.random() * 3 + 1}s`
            } as any}
          />
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {currentScene === 0 && <Scene1 key="hook" />}
        {currentScene === 1 && <Scene2 key="setup" />}
        {currentScene === 2 && <Scene3 key="goal" />}
        {currentScene === 3 && <Scene4 key="table" />}
        {currentScene === 4 && <Scene5 key="cta" />}
      </AnimatePresence>
    </div>
  );
}
