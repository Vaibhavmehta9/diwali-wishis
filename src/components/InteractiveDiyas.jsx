import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { festiveAudio } from '../utils/audio';

const DIYA_BLESSINGS = [
  { id: 1, title: 'शुभ', subtitle: 'Auspiciousness' },
  { id: 2, title: 'लाभ', subtitle: 'Prosperity' },
  { id: 3, title: 'स्वास्थ्य', subtitle: 'Good Health' },
  { id: 4, title: 'शांति', subtitle: 'Peace & Harmony' },
  { id: 5, title: 'समृद्धि', subtitle: 'Abundance' },
];

export default function InteractiveDiyas() {
  const [litDiyas, setLitDiyas] = useState([1]); // First diya is already lit as an invite

  const handleToggleDiya = (id) => {
    festiveAudio.playBell(700 + id * 120);

    if (litDiyas.includes(id)) {
      setLitDiyas((prev) => prev.filter((d) => d !== id));
    } else {
      setLitDiyas((prev) => {
        const next = [...prev, id];
        // If all diyas are lit, celebratory fireworks!
        if (next.length === DIYA_BLESSINGS.length) {
          festiveAudio.playFireworkBurst();
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.7 },
              colors: ['#FFD700', '#FFA500', '#FF4500', '#FF1493'],
            });
          } catch (e) {
            console.warn(e);
          }
        }
        return next;
      });
    }
  };

  const handleLightAll = () => {
    setLitDiyas(DIYA_BLESSINGS.map((d) => d.id));
    festiveAudio.playBell(1046.5);
    festiveAudio.playFireworkBurst();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#FFD700', '#FFA500', '#FF3366'],
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1 }}
      className="relative w-full max-w-4xl mx-auto px-4 py-10 text-center"
    >
      <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-b from-[#1c1228]/80 to-[#100a18]/90 backdrop-blur-xl border border-amber-500/30 shadow-[0_0_40px_rgba(255,180,0,0.15)]">
        
        {/* Title */}
        <h3 className="hindi-title text-2xl md:text-3xl font-bold text-gold-shimmer mb-1">
          शुभ दीप प्रज्वलन
        </h3>
        <p className="cursive text-xl md:text-2xl text-amber-200/90 mb-6">
          Tap on each Diya to illuminate our home with your prayers
        </p>

        {/* Diyas Row */}
        <div className="grid grid-cols-5 gap-2 md:gap-4 max-w-2xl mx-auto my-4">
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
                <div className="relative h-14 md:h-16 w-12 md:w-16 flex items-end justify-center">
                  <AnimatePresence>
                    {isLit && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-2 flex flex-col items-center animate-flicker"
                      >
                        {/* Outer Glow Halo */}
                        <div className="w-10 h-10 md:w-12 md:h-12 -mb-8 rounded-full bg-amber-400/30 filter blur-md" />
                        
                        {/* Realistic Teardrop Flame SVG */}
                        <svg viewBox="0 0 40 60" className="w-7 h-10 md:w-9 md:h-12 filter drop-shadow-[0_0_12px_#FFA500]">
                          <defs>
                            <linearGradient id={`flameGrad-${item.id}`} x1="0%" y1="100%" x2="0%" y2="0%">
                              <stop offset="0%" stopColor="#FF3300" />
                              <stop offset="35%" stopColor="#FF9900" />
                              <stop offset="70%" stopColor="#FFD700" />
                              <stop offset="100%" stopColor="#FFFFFF" />
                            </linearGradient>
                          </defs>
                          {/* Outer flame */}
                          <path
                            d="M20 0 C22 18 36 28 36 42 C36 52 28 60 20 60 C12 60 4 52 4 42 C4 28 18 18 20 0 Z"
                            fill={`url(#flameGrad-${item.id})`}
                          />
                          {/* Inner hot blue/white core */}
                          <ellipse cx="20" cy="46" rx="4" ry="7" fill="#E0F2FE" opacity="0.8" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Unlit Wick */}
                  {!isLit && (
                    <div className="w-[2px] h-3 bg-amber-900/60 mb-1 rounded-t" />
                  )}
                </div>

                {/* Clay Diya Body SVG */}
                <div className="relative w-12 md:w-16 h-8 md:h-10 transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 100 60" className="w-full h-full filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]">
                    <defs>
                      <linearGradient id={`diyaClay-${item.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={isLit ? "#ea580c" : "#78350f"} />
                        <stop offset="50%" stopColor={isLit ? "#c2410c" : "#451a03"} />
                        <stop offset="100%" stopColor={isLit ? "#9a3412" : "#290e02"} />
                      </linearGradient>
                      <linearGradient id={`diyaRim-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="50%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                    {/* Bowl */}
                    <path
                      d="M 5 20 Q 50 70 95 20 Q 75 12 50 12 Q 25 12 5 20 Z"
                      fill={`url(#diyaClay-${item.id})`}
                    />
                    {/* Golden Rim */}
                    <ellipse cx="50" cy="18" rx="45" ry="8" fill="none" stroke={`url(#diyaRim-${item.id})`} strokeWidth="2.5" />
                    {/* Spout tip */}
                    <path d="M 50 10 L 53 16 L 47 16 Z" fill="#fbbf24" />
                  </svg>
                </div>

                {/* Blessing Label */}
                <div className="mt-2 text-center">
                  <span className={`hindi-title text-sm md:text-base font-bold block ${isLit ? 'text-amber-300' : 'text-amber-500/50'}`}>
                    {item.title}
                  </span>
                  <span className="text-[10px] md:text-xs text-amber-200/60 font-light hidden sm:block">
                    {item.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Counter & Action */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-amber-500/20 max-w-xl mx-auto">
          <p className="text-xs md:text-sm text-amber-200/80">
            Diyas illuminated:{' '}
            <span className="font-bold text-amber-300 text-base">{litDiyas.length}</span> of {DIYA_BLESSINGS.length} 🪔
          </p>

          <button
            onClick={handleLightAll}
            className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 hover:from-amber-500/30 hover:to-amber-500/30 border border-amber-400/50 text-amber-200 transition-all active:scale-95 shadow-[0_0_15px_rgba(255,200,0,0.2)]"
          >
            ✨ Light All Diyas Together
          </button>
        </div>

      </div>
    </motion.section>
  );
}

