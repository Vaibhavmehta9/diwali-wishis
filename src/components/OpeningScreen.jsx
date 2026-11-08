import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Volume2, VolumeX, Flame } from 'lucide-react';
import { festiveAudio } from '../utils/audio';

export default function OpeningScreen({ onEnter, isMuted, toggleMute }) {
  const handleEnterClick = () => {
    // 1. Festive sound
    if (isMuted) {
      toggleMute(); // starts music
    } else {
      festiveAudio.playFireworkBurst();
      festiveAudio.playBell(1046.5);
    }

    // 2. Confetti explosion
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#FFD700', '#FFA500', '#FF3366', '#FFFFFF', '#FF8C00'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FF4500'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FF4500'],
        });
      }, 250);
    } catch (e) {
      console.warn(e);
    }

    // 3. Trigger transition to main wishes
    onEnter();
  };

  return (
    <div className="relative w-full min-h-screen h-[100dvh] overflow-hidden flex flex-col justify-between items-center text-center select-none bg-[#050408]">
      {/* 
        HERO BACKGROUND: REAL MEHTA FAMILY HOUSE PHOTOGRAPH 
        - Portrait-friendly, full-screen vertical image
        - Centered building composition
        - Object-fit cover
        - Cinematic slow zoom (Ken Burns)
      */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="/mehta_home.jpg"
          alt="Mehta Family Home illuminated with Diwali lights"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08] saturate-[1.12]"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />

        {/* Warm golden festive lighting ambient pulse over the house */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-amber-900/30 mix-blend-color-dodge animate-pulse" />

        {/* Dark cinematic vignette & gradients to ensure utmost readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

        {/* Subtle twinkling fairy lights overlaid across the house */}
        <div className="absolute top-[18%] left-[20%] w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_15px_#FFD700] animate-twinkle" />
        <div className="absolute top-[24%] right-[28%] w-3.5 h-3.5 rounded-full bg-cyan-300 shadow-[0_0_15px_#00FFFF] animate-twinkle delay-300" />
        <div className="absolute top-[38%] left-[32%] w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_12px_#FF1493] animate-twinkle delay-700" />
        <div className="absolute top-[42%] right-[35%] w-3 h-3 rounded-full bg-yellow-200 shadow-[0_0_15px_#FFFF00] animate-twinkle delay-500" />
        <div className="absolute top-[60%] left-[25%] w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#00FF7F] animate-twinkle delay-1000" />
      </div>

      {/* Floating Sound Toggle */}
      <div className="relative z-30 w-full flex justify-end p-4 pt-5">
        <button
          onClick={toggleMute}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/40 text-amber-200 text-xs md:text-sm font-medium hover:border-amber-400 transition-all shadow-lg active:scale-95"
          title={isMuted ? "Turn on festive music" : "Mute festive music"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-amber-400/70" />
              <span>Music: Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="text-amber-300 font-semibold">Festive Music On 🎵</span>
            </>
          )}
        </button>
      </div>

      {/* TOP HEADER: शुभ दीपावली */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-20 px-4 mt-2 max-w-lg mx-auto"
      >
        <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-black/55 backdrop-blur-md border border-amber-500/40 shadow-[0_0_25px_rgba(255,215,0,0.25)]">
          <span className="text-2xl filter drop-shadow-[0_0_8px_#FFD700]">🪔</span>
          <span className="hindi-title text-2xl md:text-3xl font-extrabold tracking-wider text-gold-shimmer">
            शुभ दीपावली
          </span>
          <span className="text-2xl filter drop-shadow-[0_0_8px_#FFD700]">🪔</span>
        </div>
        <p className="text-amber-200/80 text-xs tracking-[0.25em] uppercase font-light mt-2">
          Festival of Lights & Prosperity
        </p>
      </motion.div>

      {/* CENTER HERO: Welcome to Our Home - MEHTA FAMILY */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="relative z-20 px-6 py-4 my-auto max-w-xl mx-auto flex flex-col items-center"
      >
        {/* Subtle decorative glowing emblem */}
        <div className="w-16 h-16 mb-2 rounded-full border border-amber-400/40 flex items-center justify-center bg-gradient-to-b from-amber-500/20 to-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(255,190,0,0.4)]">
          <Flame className="w-8 h-8 text-amber-300 animate-flicker" />
        </div>

        {/* Cursive / Elegant "Welcome to Our Home" */}
        <p className="cursive text-3xl md:text-5xl text-amber-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] tracking-wide">
          Welcome to Our Home
        </p>

        {/* Majestic MEHTA FAMILY */}
        <div className="mt-1 relative">
          <h1 className="cinzel text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[0.18em] text-gold-gradient drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
            MEHTA FAMILY
          </h1>
          <div className="w-32 md:w-48 h-[2px] mx-auto mt-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        <p className="mt-3 text-sm md:text-base text-amber-100/90 font-light max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Warmest greetings from our beautifully illuminated home to yours on this holy celebration.
        </p>
      </motion.div>

      {/* BOTTOM ACTION: Animated Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative z-20 px-4 pb-8 w-full max-w-md mx-auto"
      >
        <button
          onClick={handleEnterClick}
          className="group relative w-full py-4 px-8 rounded-full overflow-hidden font-semibold text-lg md:text-xl tracking-wider text-amber-950 transition-all duration-300 transform active:scale-95 shadow-[0_0_35px_rgba(255,215,0,0.6)] hover:shadow-[0_0_50px_rgba(255,215,0,0.9)]"
        >
          {/* Radiant Gold Button Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 group-hover:brightness-110 transition-all" />
          
          {/* Animated Sheen */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent transform transition-transform" />

          {/* Button Text */}
          <span className="relative z-10 flex items-center justify-center gap-3 font-bold cinzel text-amber-950">
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>✨ Enter Diwali Celebration ✨</span>
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
          </span>
        </button>

        <p className="text-[11px] md:text-xs text-amber-200/70 mt-3 font-light tracking-wide">
          Tap to view personalized greetings, firecrackers & festive music
        </p>
      </motion.div>
    </div>
  );
}

