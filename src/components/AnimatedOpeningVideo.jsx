import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, ChevronRight, Play } from 'lucide-react';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

const SCENES = [
  { id: 0, title: 'निमंत्रण', subtitle: 'A Special Diwali Blessing' },
  { id: 1, title: 'दीप प्रज्वलन', subtitle: 'Lighting the Auspicious Flame' },
  { id: 2, title: 'रंगोली का सौंदर्य', subtitle: 'Sacred Rangoli Blossoms' },
  { id: 3, title: 'आकाश दीप', subtitle: 'Lanterns Rising to the Heavens' },
  { id: 4, title: 'दीपावली उत्सव', subtitle: 'Festival of Lights & Fireworks' },
];

export default function AnimatedOpeningVideo({ onComplete, isMuted, toggleMute }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);

  // Audio & scene timeline
  useEffect(() => {
    if (!isPlaying) return;

    soundManager.playSong();
    soundManager.playEffect('intro', 0.6);

    const timers = [];

    // Scene 1: Lighting the Diya (at 100ms)
    timers.push(
      setTimeout(() => {
        setCurrentScene(1);
        soundManager.playEffect('strike', 0.6);
        setTimeout(() => soundManager.playEffect('flame', 0.8), 400);
      }, 100)
    );

    // Scene 2: Rangoli Blossom (at 2800ms)
    timers.push(
      setTimeout(() => {
        setCurrentScene(2);
        soundManager.playEffect('bell', 0.5);
      }, 2800)
    );

    // Scene 3: Sky Lanterns (at 5400ms)
    timers.push(
      setTimeout(() => {
        setCurrentScene(3);
        soundManager.playEffect('lantern', 0.6);
      }, 5400)
    );

    // Scene 4: Fireworks (at 8200ms)
    timers.push(
      setTimeout(() => {
        setCurrentScene(4);
        soundManager.playEffect('burst', 0.7);
        try {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#FFD700', '#FFA500', '#FF3366', '#FFFFFF'],
          });
        } catch (e) {}
      }, 8200)
    );

    // Scene Complete: Reveal Home & Page (at 11500ms)
    timers.push(
      setTimeout(() => {
        soundManager.playEffect('wish', 0.8);
        onComplete();
      }, 11500)
    );

    return () => timers.forEach(clearTimeout);
  }, [isPlaying, onComplete]);

  const handleStart = () => {
    soundManager.init();
    setIsPlaying(true);
  };

  const handleSkip = () => {
    soundManager.playSong();
    onComplete();
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-[#050408] text-amber-100 flex flex-col justify-between items-center select-none">
      
      {/* Background Animated Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-radial-at-c from-[#1f102e]/60 via-[#0a0512]/90 to-[#040206]" />
        
        {/* Subtle real house image in the background with slow Ken Burns */}
        <motion.img
          src="/mehta_home.jpg"
          alt="Mehta Family Home"
          className="w-full h-full object-cover object-center filter brightness-[0.4] saturate-[1.1] scale-105"
          animate={{ scale: [1.02, 1.1] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: 'reverse' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/85" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-30 w-full px-4 pt-4 flex items-center justify-between">
        {/* Diwali Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-xs text-amber-200">
          <span>🪔</span>
          <span className="hindi-title font-bold text-gold-shimmer">शुभ दीपावली</span>
        </div>

        {/* Audio & Skip Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-amber-400/40 text-amber-200 text-xs font-medium hover:border-amber-300 transition-all active:scale-95 shadow-md"
            title={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-amber-400/70" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            )}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>

          {isPlaying && (
            <button
              onClick={handleSkip}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-200 text-xs font-semibold hover:bg-amber-500/30 transition-all active:scale-95 shadow-sm"
            >
              <span>Skip Intro</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Indicator Dots during video */}
      {isPlaying && (
        <div className="relative z-30 flex items-center gap-2 mt-2">
          {SCENES.slice(1).map((s, idx) => (
            <div
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-700 ${
                currentScene >= s.id
                  ? 'w-6 bg-gradient-to-r from-amber-400 to-yellow-200 shadow-[0_0_8px_#FFD700]'
                  : 'w-2 bg-amber-900/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* CENTER STAGE: SCENE ANIMATIONS */}
      <div className="relative z-20 flex-1 w-full max-w-lg mx-auto flex flex-col items-center justify-center px-4 text-center">
        
        {/* START PROMPT (Scene 0) */}
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Glowing Sacred Gift Envelope / Emblem */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-24 h-24 mb-4 rounded-3xl p-1 bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 shadow-[0_0_40px_rgba(255,215,0,0.5)] flex items-center justify-center cursor-pointer"
              onClick={handleStart}
            >
              <div className="w-full h-full rounded-[22px] bg-[#140b22] flex flex-col items-center justify-center">
                <span className="text-4xl filter drop-shadow-[0_0_12px_#FFD700]">🪔</span>
                <Sparkles className="w-4 h-4 text-amber-300 absolute top-2 right-2 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            </motion.div>

            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/90 font-medium mb-1">
              Festive Invitation
            </p>
            <h1 className="cinzel text-3xl md:text-5xl font-extrabold text-gold-shimmer mb-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              MEHTA FAMILY
            </h1>
            <p className="cursive text-2xl md:text-3xl text-amber-200 mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Welcome to our home for Diwali celebration
            </p>

            {/* Tap to Open Button */}
            <button
              onClick={handleStart}
              className="group relative px-8 py-4 rounded-full overflow-hidden font-bold cinzel text-base md:text-lg tracking-wider text-amber-950 transition-all duration-300 transform active:scale-95 shadow-[0_0_35px_rgba(255,215,0,0.7)] hover:shadow-[0_0_55px_rgba(255,215,0,1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 group-hover:brightness-110" />
              <div className="relative z-10 flex items-center gap-2.5">
                <Play className="w-5 h-5 fill-current" />
                <span>✨ Tap to Begin Celebration ✨</span>
              </div>
            </button>

            <p className="text-[11px] text-amber-300/80 mt-3 font-light tracking-wide flex items-center gap-1.5">
              <span>🔊 Best experienced with sound on</span>
            </p>
          </motion.div>
        )}

        {/* SCENE 1: LIGHTING THE SACRED DIYA */}
        {isPlaying && currentScene === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Radiant Flame Flare */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-44 h-44 rounded-full bg-gradient-to-r from-amber-500/40 via-yellow-400/30 to-orange-500/30 filter blur-xl"
              />
              <span className="text-7xl filter drop-shadow-[0_0_25px_#FFA500] animate-flicker">
                🪔
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="hindi-title text-2xl md:text-3xl font-bold text-gold-shimmer mt-4"
            >
              शुभ दीप प्रज्वलन
            </motion.p>
            <p className="cursive text-xl text-amber-200 mt-1">
              Igniting the light of prosperity & happiness
            </p>
          </motion.div>
        )}

        {/* SCENE 2: SACRED RANGOLI BLOSSOM */}
        {isPlaying && currentScene === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Animated Floral Rangoli SVG */}
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <svg viewBox="0 0 200 200" className="w-full h-full text-amber-400 animate-spin" style={{ animationDuration: '30s' }}>
                <circle cx="100" cy="100" r="92" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="75" fill="none" stroke="#FCD34D" strokeWidth="1.5" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <g key={deg} transform={`rotate(${deg} 100 100)`}>
                    <path d="M100 25 C108 50 115 65 100 85 C85 65 92 50 100 25 Z" fill="#F59E0B" opacity="0.8" />
                    <circle cx="100" cy="30" r="4" fill="#FDE68A" />
                  </g>
                ))}
                <circle cx="100" cy="100" r="30" fill="#EA580C" opacity="0.6" />
                <circle cx="100" cy="100" r="16" fill="#FEF08A" />
              </svg>
            </div>

            <p className="hindi-title text-2xl md:text-3xl font-bold text-gold-shimmer mt-4">
              खुशियों की रंगोली
            </p>
            <p className="cursive text-xl text-amber-200 mt-1">
              Welcoming Maa Lakshmi into our home
            </p>
          </motion.div>
        )}

        {/* SCENE 3: SKY LANTERNS (KANDILS) */}
        {isPlaying && currentScene === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center w-full"
          >
            <div className="relative h-44 w-full flex items-center justify-center gap-6 overflow-hidden">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: [-10, -50, -90], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.8, delay: i * 0.4, repeat: Infinity, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                >
                  <div className="w-10 h-14 rounded-lg bg-gradient-to-b from-amber-300 via-orange-400 to-amber-600 shadow-[0_0_20px_#FFA500] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-100 animate-pulse" />
                  </div>
                  <div className="w-1 h-3 bg-amber-400/50" />
                </motion.div>
              ))}
            </div>

            <p className="hindi-title text-2xl md:text-3xl font-bold text-gold-shimmer mt-2">
              उड़ते आकाशदीप
            </p>
            <p className="cursive text-xl text-amber-200 mt-1">
              Carrying prayers of peace & prosperity
            </p>
          </motion.div>
        )}

        {/* SCENE 4: GRAND FIREWORKS & GREETINGS */}
        {isPlaying && currentScene === 4 && (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-6xl animate-bounce filter drop-shadow-[0_0_20px_#FFD700]">
              🎆
            </span>
            <h2 className="hindi-title text-3xl md:text-4xl font-extrabold text-gold-shimmer mt-4 drop-shadow-[0_2px_15px_rgba(255,215,0,0.6)]">
              दीपावली महोत्सव
            </h2>
            <p className="cinzel text-lg md:text-xl font-bold text-amber-200 mt-1">
              MEHTA FAMILY WELCOMES YOU
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-30 pb-6 text-center">
        <p className="cinzel text-xs tracking-widest text-amber-300/60 font-semibold">
          MEHTA RESIDENCE • DIWALI 2026
        </p>
      </div>

    </div>
  );
}

