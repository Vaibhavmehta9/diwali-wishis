import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

const DIYA_BLESSINGS = [
  { id: 1, title: 'शुभ', subtitle: 'Auspiciousness' },
  { id: 2, title: 'लाभ', subtitle: 'Prosperity' },
  { id: 3, title: 'स्वास्थ्य', subtitle: 'Health' },
  { id: 4, title: 'शांति', subtitle: 'Peace' },
  { id: 5, title: 'समृद्धि', subtitle: 'Abundance' },
];

export default function InteractiveDiyas() {
  const [litDiyas, setLitDiyas] = useState([1]);

  const handleToggleDiya = (id) => {
    soundManager.playBell(700 + id * 120);

    if (litDiyas.includes(id)) {
      setLitDiyas((prev) => prev.filter((d) => d !== id));
    } else {
      setLitDiyas((prev) => {
        const next = [...prev, id];
        if (next.length === DIYA_BLESSINGS.length) {
          soundManager.playFireworkBurst();
          try {
            confetti({
              particleCount: 50,
              spread: 65,
              origin: { y: 0.7 },
              colors: ['#F3E5C8', '#D4AF37', '#DFB850', '#E2A76F'],
            });
          } catch (e) {}
        }
        return next;
      });
    }
  };

  const handleLightAll = () => {
    setLitDiyas(DIYA_BLESSINGS.map((d) => d.id));
    soundManager.playBell(1046.5);
    soundManager.playFireworkBurst();
    try {
      confetti({
        particleCount: 60,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#F3E5C8', '#D4AF37', '#DFB850'],
      });
    } catch (e) {}
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative w-full max-w-4xl mx-auto px-4 py-8 text-center"
    >
      <div className="rounded-3xl p-5 md:p-8 glass-panel-luxury">
        
        {/* Title */}
        <h3 className="hindi-title text-xl md:text-2xl font-semibold text-gold-shimmer mb-1">
          शुभ दीप प्रज्वलन
        </h3>
        <p className="cursive text-lg md:text-xl text-[#dfca95]/80 mb-5">
          Tap each Diya to illuminate our home with your prayers
        </p>

        {/* Diyas Row */}
        <div className="grid grid-cols-5 gap-2 md:gap-4 max-w-2xl mx-auto my-3">
          {DIYA_BLESSINGS.map((item) => {
            const isLit = litDiyas.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleToggleDiya(item.id)}
                className="group flex flex-col items-center focus:outline-none transition-transform active:scale-95"
                title={`Tap to ${isLit ? 'extinguish' : 'light'} ${item.title} diya`}
              >
                {/* Flame Container */}
                <div className="relative h-13 md:h-15 w-12 md:w-14 flex items-end justify-center">
                  <AnimatePresence>
                    {isLit && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, y: 8 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute bottom-1.5 flex flex-col items-center animate-flicker"
                      >
                        {/* Outer Glow Halo - Muted warm amber */}
                        <div className="w-8 h-8 md:w-10 md:h-10 -mb-6 rounded-full bg-[#d4af37]/20 filter blur-md" />
                        
                        {/* Elegant Teardrop Flame SVG */}
                        <svg viewBox="0 0 40 60" className="w-6 h-9 md:w-8 md:h-11">
                          <defs>
                            <linearGradient id={`flameGrad-${item.id}`} x1="0%" y1="100%" x2="0%" y2="0%">
                              <stop offset="0%" stopColor="#C26A20" />
                              <stop offset="40%" stopColor="#DF9B38" />
                              <stop offset="75%" stopColor="#F6D582" />
                              <stop offset="100%" stopColor="#FFFDF7" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M20 0 C22 18 36 28 36 42 C36 52 28 60 20 60 C12 60 4 52 4 42 C4 28 18 18 20 0 Z"
                            fill={`url(#flameGrad-${item.id})`}
                          />
                          <ellipse cx="20" cy="46" rx="3" ry="5.5" fill="#E8EEF5" opacity="0.65" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Unlit Wick */}
                  {!isLit && (
                    <div className="w-[1.5px] h-2.5 bg-[#4a3a25] mb-1 rounded-t" />
                  )}
                </div>

                {/* Refined Clay Diya Body SVG - Terracotta & Antique Bronze */}
                <div className="relative w-11 md:w-14 h-7 md:h-9 transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 100 60" className="w-full h-full filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                    <defs>
                      <linearGradient id={`diyaClay-${item.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={isLit ? "#6e3f22" : "#3b2518"} />
                        <stop offset="60%" stopColor={isLit ? "#522e18" : "#28180e"} />
                        <stop offset="100%" stopColor={isLit ? "#3d2010" : "#1a100a"} />
                      </linearGradient>
                      <linearGradient id={`diyaRim-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#9a7b2c" />
                        <stop offset="50%" stopColor="#e3cf8f" />
                        <stop offset="100%" stopColor="#9a7b2c" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 5 20 Q 50 68 95 20 Q 75 12 50 12 Q 25 12 5 20 Z"
                      fill={`url(#diyaClay-${item.id})`}
                    />
                    <ellipse cx="50" cy="18" rx="45" ry="8" fill="none" stroke={`url(#diyaRim-${item.id})`} strokeWidth="2" opacity="0.8" />
                    <path d="M 50 10 L 52.5 16 L 47.5 16 Z" fill="#d4af37" opacity="0.85" />
                  </svg>
                </div>

                {/* Blessing Label */}
                <div className="mt-1.5 text-center">
                  <span className={`hindi-title text-xs md:text-sm font-medium block ${isLit ? 'text-[#dfca95]' : 'text-[#dfca95]/40'}`}>
                    {item.title}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-[#dfca95]/50 font-light hidden sm:block">
                    {item.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Counter & Action */}
        <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 border-t border-[#d4af37]/15 max-w-xl mx-auto">
          <p className="text-xs text-[#dfca95]/70">
            Diyas illuminated:{' '}
            <span className="font-semibold text-[#dfca95]">{litDiyas.length}</span> of {DIYA_BLESSINGS.length} 🪔
          </p>

          <button
            onClick={handleLightAll}
            className="px-3.5 py-1 rounded-full text-xs font-medium bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#dfca95] transition-all active:scale-95 shadow-sm"
          >
            ✨ Light All Diyas
          </button>
        </div>

      </div>
    </motion.section>
  );
}
