import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d1b3e] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1 
        className="text-[6vw] font-black text-white z-10 text-center leading-tight mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={phase >= 1 ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        Начни копить<br/>сегодня
      </motion.h1>

      <motion.div 
        className="text-[8vw] z-20 absolute"
        initial={{ x: "-50vw", y: "50vh", rotate: 45 }}
        animate={phase >= 2 ? { x: "50vw", y: "-50vh" } : { x: "-50vw", y: "50vh" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        🚀
      </motion.div>

      <motion.div 
        className="z-10 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center gap-4 text-[#4d9de0] text-[3vw] font-bold">
          <span>🌟</span> Космо-копилка <span>🌟</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
