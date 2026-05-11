import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),  // Title
      setTimeout(() => setPhase(2), 1000), // Header
      setTimeout(() => setPhase(3), 1500), // Row 1
      setTimeout(() => setPhase(4), 2000), // Row 2
      setTimeout(() => setPhase(5), 2500), // Row 3
      setTimeout(() => setPhase(6), 3000), // Row ...
      setTimeout(() => setPhase(7), 3500), // Row 12
      setTimeout(() => setPhase(8), 5000), // Highlight
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const rows = [
    { m: "1", start: "10 000", perc: "+100", dep: "+1 000", total: "11 100", p: 3 },
    { m: "2", start: "11 100", perc: "+111", dep: "+1 000", total: "12 211", p: 4 },
    { m: "3", start: "12 211", perc: "+122", dep: "+1 000", total: "13 333", p: 5 },
    { m: "...", start: "...", perc: "...", dep: "...", total: "...", p: 6 },
    { m: "12", start: "22 710", perc: "+240", dep: "+1 000", total: "23 950", p: 7 },
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d1b3e]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
    >
      <motion.h2 
        className="text-[4vw] font-bold mb-8 text-white"
        initial={{ y: -30, opacity: 0 }}
        animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
      >
        10 000 ₽ <span className="text-[#ffcc4d]">→ 23 950 ₽</span> за год
      </motion.h2>

      <div className="w-[70vw] bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <motion.div 
          className="grid grid-cols-5 bg-white/10 p-4 font-bold text-[1.5vw] text-white/80"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="text-center">Мес</div>
          <div className="text-right">Начало</div>
          <div className="text-right">+%</div>
          <div className="text-right">+Взнос</div>
          <div className="text-right text-[#ffcc4d]">Итог</div>
        </motion.div>

        {/* Table Rows */}
        <div className="p-4 space-y-2">
          {rows.map((row, i) => (
            <motion.div 
              key={i}
              className={`grid grid-cols-5 py-2 text-[1.5vw] border-b border-white/5 ${row.m === "12" ? 'font-bold' : 'text-white/70'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={phase >= row.p ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            >
              <div className="text-center text-white">{row.m}</div>
              <div className="text-right">{row.start} ₽</div>
              <div className="text-right text-[#23b99a]">{row.perc} ₽</div>
              <div className="text-right text-[#4d9de0]">{row.dep} ₽</div>
              <div className="text-right text-[#ffcc4d]">{row.total} ₽</div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        className="mt-8 bg-[#23b99a]/10 border border-[#23b99a]/30 px-8 py-4 rounded-full"
        initial={{ opacity: 0, y: 30 }}
        animate={phase >= 8 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <span className="text-[#23b99a] text-[2vw] font-bold">
          +1 950 ₽ чистыми процентами ✨
        </span>
      </motion.div>
    </motion.div>
  );
}
