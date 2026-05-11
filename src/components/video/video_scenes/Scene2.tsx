import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 1900),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, x: -50, rotate: -5 },
    visible: { opacity: 1, x: 0, rotate: 0 }
  };

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d1b3e]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
    >
      <div className="flex gap-8">
        <motion.div 
          className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 w-80 text-center"
          initial="hidden"
          animate={phase >= 1 ? "visible" : "hidden"}
          variants={cardVariants}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="text-[4vw] mb-2">💰</div>
          <div className="text-white/60 text-[1.5vw] mb-2">Стартовый баланс</div>
          <div className="text-[#ffcc4d] font-bold text-[2.5vw]">10 000 ₽</div>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 w-80 text-center"
          initial="hidden"
          animate={phase >= 2 ? "visible" : "hidden"}
          variants={cardVariants}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="text-[4vw] mb-2">📈</div>
          <div className="text-white/60 text-[1.5vw] mb-2">Ставка</div>
          <div className="text-[#23b99a] font-bold text-[2.5vw]">12% годовых</div>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 w-80 text-center"
          initial="hidden"
          animate={phase >= 3 ? "visible" : "hidden"}
          variants={cardVariants}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="text-[4vw] mb-2">📅</div>
          <div className="text-white/60 text-[1.5vw] mb-2">Взнос</div>
          <div className="text-[#4d9de0] font-bold text-[2.5vw]">1 000 ₽/мес</div>
        </motion.div>
      </div>
    </motion.div>
  );
}
