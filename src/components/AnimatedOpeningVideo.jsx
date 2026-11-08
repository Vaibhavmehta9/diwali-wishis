import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, ChevronRight, Play } from 'lucide-react';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

const SCENES = [
  { id: 0, title: 'शुभ निमंत्रण', subtitle: 'A Special Diwali Blessing' },
  { id: 1, title: 'शुभ दीप प्रज्वलन', subtitle: 'Lighting the Sacred Flame' },
  { id: 2, title: 'खुशियों की रंगोली', subtitle: 'Sacred Rangoli Blossoms' },
  { id: 3, title: 'उड़ते आकाशदीप', subtitle: 'Lanterns Rising to the Heavens' },
  { id: 4, title: 'दीपावली महोत्सव', subtitle: 'Celebration of Divine Light' },
];

export default function AnimatedOpeningVideo({ onComplete, isMuted, toggleMute }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);

  // Audio & scene timeline
  useEffect(() => {
    if (!isPlaying) return;

    soundManager.playSong();
    soundManager.playEffect('intro', 0.5);

    const timers = [];

    // Scene 1: Lighting the Diya (at 100ms)
    timers.push(
      setTimeout(() => {
        setCurrentScene(1);
        soundManager.playEffect('strike', 0.5);
        setTimeout(() => soundManager.playEffect('flame', 0.7), 400);
      }, 100)
    );

    // Scene 2: Rangoli Blossom (at 2800ms)
    timers.push(
      setTimeout(() => {
        setCurrentScene(2);
        soundManager.playEffect('bell', 0.45);
      }, 2800)
    );

    // Scene 3: Sky Lanterns (at 5400ms)
    timers.push(
      setTimeout(() => {
        setCurrentScene(3);
        soundManager.playEffect('lantern', 0.5);
      }, 5400)
    );

    // Scene 4: Fireworks (at 8200ms)
    timers.push(
      setTimeout(() => {
        setCurrentScene(4);
        soundManager.playEffect('burst', 0.6);
        try {
          confetti({
            particleCount: 55,
            spread: 75,
            origin: { y: 0.5 },
            colors: ['#F3E5C8', '#D4AF37', '#DFB850', '#E2A76F', '#C59B27'],
          });
        } catch (e) {}
      }, 8200)
    );

    // Scene Complete: Reveal Home & Page (at 11500ms)
    timers.push(
      setTimeout(() => {
        soundManager.playEffect('wish', 0.7);
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
    <div className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-[#040307] text-[#e6dfd3] flex flex-col justify-between items-center select-none">
      
      {/* Background Animated Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle real house image in the background with slow Ken Burns */}
        <motion.img
          src="/mehta_home.jpg"
          alt="Mehta Family Home"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.02] saturate-[0.95]"
          animate={{ scale: [1.02, 1.08] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        
        {/* Refined gradient overlay: soft vignette, no harsh dark or neon spots */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040307] via-[#040307]/75 to-[#040307]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(4,3,7,0.85)_100%)] pointer-events-none" />

        {/* Ambient warm light beam moving subtly */}
        <motion.div
          animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-b from-[#d4af37]/15 to-transparent filter blur-3xl pointer-events-none"
        />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-30 w-full px-4 pt-4 flex items-center justify-between">
        {/* Diwali Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120e1a]/70 backdrop-blur-md border border-[#d4af37]/20 text-xs text-[#dfca95]">
          <span className="opacity-90">🪔</span>
          <span className="hindi-title font-medium tracking-wide text-gold-shimmer">शुभ दीपावली</span>
        </div>

        {/* Audio & Skip Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#120e1a]/80 border border-[#d4af37]/25 text-[#dfca95] text-xs font-medium hover:border-[#d4af37]/45 transition-all active:scale-95 shadow-sm"
            title={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#dfca95]/60" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#dfca95] animate-pulse" />
            )}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>

          {isPlaying && (
            <button
              onClick={handleSkip}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#dfca95] text-xs font-medium hover:bg-[#d4af37]/15 transition-all active:scale-95 shadow-sm"
            >
              <span>Skip Intro</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
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
              className={`h-1 rounded-full transition-all duration-700 ${
                currentScene >= s.id
                  ? 'w-6 bg-gradient-to-r from-[#dfca95] to-[#c59b27] shadow-[0_0_8px_rgba(212,175,55,0.4)]'
                  : 'w-2 bg-[#d4af37]/20'
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
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Glowing Sacred Gift Envelope / Emblem */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-24 h-24 mb-4 rounded-3xl p-[1px] bg-gradient-to-b from-[#d4af37]/50 via-[#d4af37]/20 to-transparent shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_25px_rgba(212,175,55,0.15)] flex items-center justify-center cursor-pointer"
              onClick={handleStart}
            >
              <div className="w-full h-full rounded-[23px] bg-gradient-to-b from-[#181322] to-[#0c0914] flex flex-col items-center justify-center border border-[#d4af37]/15">
                <span className="text-4xl filter drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">🪔</span>
                <Sparkles className="w-3.5 h-3.5 text-[#dfca95]/70 absolute top-2 right-2 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </motion.div>

            <p className="text-[11px] uppercase tracking-[0.28em] text-[#dfca95]/75 font-medium mb-1.5">
              Festive Blessing & Invitation
            </p>
            <h1 className="cinzel text-3xl md:text-5xl font-bold text-gold-shimmer mb-2 tracking-[0.16em] drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
              MEHTA FAMILY
            </h1>
            <p className="cursive text-2xl md:text-3xl text-[#ecdcb5] mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Welcome to our home for Diwali celebration
            </p>

            {/* Tap to Open Button */}
            <button
              onClick={handleStart}
              className="group relative px-8 py-3.5 rounded-full overflow-hidden font-medium cinzel text-sm md:text-base tracking-widest text-[#1c1404] transition-all duration-300 transform active:scale-95 shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.55)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#e8cf90] via-[#dfba60] to-[#c79d39] group-hover:brightness-105 transition-all" />
              <div className="relative z-10 flex items-center gap-2.5 font-semibold">
                <Play className="w-4 h-4 fill-current opacity-85" />
                <span>✨ Begin Diwali Celebration ✨</span>
              </div>
            </button>

            <p className="text-[11px] text-[#dfca95]/60 mt-3.5 font-light tracking-wide flex items-center gap-1.5">
              <span>🔊 Best experienced with sound on</span>
            </p>
          </motion.div>
        )}

        {/* SCENE 1: LIGHTING THE SACRED DIYA */}
        {isPlaying && currentScene === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Radiant Flame Flare */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-44 h-44 rounded-full bg-gradient-to-r from-[#d4af37]/20 via-[#c59b27]/15 to-transparent filter blur-2xl"
              />
              <span className="text-7xl filter drop-shadow-[0_0_18px_rgba(212,175,55,0.65)] animate-flicker">
                🪔
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hindi-title text-2xl md:text-3xl font-medium text-gold-shimmer mt-4"
            >
              शुभ दीप प्रज्वलन
            </motion.p>
            <p className="cursive text-xl text-[#dfca95]/90 mt-1">
              Igniting the light of peace, health & prosperity
            </p>
          </motion.div>
        )}

        {/* SCENE 2: SACRED RANGOLI BLOSSOM */}
        {isPlaying && currentScene === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Animated Floral Rangoli SVG in Soft Champagne Gold */}
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <svg viewBox="0 0 200 200" className="w-full h-full text-[#d4af37] animate-spin" style={{ animationDuration: '35s' }}>
                <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(212, 175, 55, 0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <g key={deg} transform={`rotate(${deg} 100 100)`}>
                    <path d="M100 25 C108 50 115 65 100 85 C85 65 92 50 100 25 Z" fill="rgba(212, 175, 55, 0.5)" />
                    <circle cx="100" cy="30" r="3.5" fill="#FFF4D6" opacity="0.9" />
                  </g>
                ))}
                <circle cx="100" cy="100" r="28" fill="rgba(197, 155, 39, 0.4)" />
                <circle cx="100" cy="100" r="14" fill="rgba(243, 229, 200, 0.85)" />
              </svg>
            </div>

            <p className="hindi-title text-2xl md:text-3xl font-medium text-gold-shimmer mt-4">
              खुशियों की रंगोली
            </p>
            <p className="cursive text-xl text-[#dfca95]/90 mt-1">
              Welcoming grace & auspicious blessings into our home
            </p>
          </motion.div>
        )}

        {/* SCENE 3: SKY LANTERNS (KANDILS) */}
        {isPlaying && currentScene === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -35 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center w-full"
          >
            <div className="relative h-44 w-full flex items-center justify-center gap-8 overflow-hidden">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ y: 70, opacity: 0 }}
                  animate={{ y: [-10, -50, -90], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 3.2, delay: i * 0.45, repeat: Infinity, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                >
                  <div className="w-9 h-13 rounded-lg bg-gradient-to-b from-[#f3e5c8] via-[#dfba60] to-[#996d19] shadow-[0_0_18px_rgba(212,175,55,0.4)] flex items-center justify-center border border-[#d4af37]/30">
                    <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  </div>
                  <div className="w-[1px] h-3 bg-[#d4af37]/40" />
                </motion.div>
              ))}
            </div>

            <p className="hindi-title text-2xl md:text-3xl font-medium text-gold-shimmer mt-2">
              उड़ते आकाशदीप
            </p>
            <p className="cursive text-xl text-[#dfca95]/90 mt-1">
              Carrying prayers of harmony, peace & joy
            </p>
          </motion.div>
        )}

        {/* SCENE 4: GRAND FIREWORKS & GREETINGS */}
        {isPlaying && currentScene === 4 && (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-6xl filter drop-shadow-[0_0_16px_rgba(212,175,55,0.5)]">
              🎆
            </span>
            <h2 className="hindi-title text-3xl md:text-4xl font-semibold text-gold-shimmer mt-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              दीपावली महोत्सव
            </h2>
            <p className="cinzel text-base md:text-lg font-semibold tracking-widest text-[#dfca95] mt-1">
              MEHTA FAMILY WELCOMES YOU
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-30 pb-5 text-center">
        <p className="cinzel text-[11px] tracking-[0.25em] text-[#dfca95]/50 font-medium">
          MEHTA RESIDENCE • DIWALI 2026
        </p>
      </div>

    </div>
  );
}
