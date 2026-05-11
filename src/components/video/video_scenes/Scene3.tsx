import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => setPhase(4), 5000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d1b3e]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
    >
      <motion.div 
        className="bg-white/5 border border-white/10 rounded-3xl p-12 w-[60vw] max-w-4xl"
        initial={{ y: 50, opacity: 0 }}
        animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <h2 className="text-[3vw] font-bold text-center mb-10 text-white">
          🎯 Цель: Клавиатура — <span className="text-[#ffcc4d]">20 000 ₽</span>
        </h2>

        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2 text-[1.5vw]">
              <span className="text-white/60">Сейчас</span>
              <span className="text-white">10 000 ₽ (50%)</span>
            </div>
            <div className="h-6 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#4d9de0] rounded-full"
                initial={{ width: "0%" }}
                animate={phase >= 2 ? { width: "50%" } : { width: "0%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2 text-[1.5vw]">
              <span className="text-white/60">Через 9 мес</span>
              <span className="text-[#ffcc4d] font-bold">20 000 ₽ (100%) 🎉</span>
            </div>
            <div className="h-6 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#23b99a] rounded-full relative overflow-hidden"
                initial={{ width: "0%" }}
                animate={phase >= 3 ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-white/20 w-1/2"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <span className="bg-[#23b99a]/20 text-[#23b99a] px-6 py-3 rounded-full text-[1.5vw] font-medium border border-[#23b99a]/30 inline-block">
            Цель достигнута через ~9 месяцев!
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
