import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedOpeningVideo from './components/AnimatedOpeningVideo';
import MainWishes from './components/MainWishes';
import FamilySection from './components/FamilySection';
import InteractiveDiyas from './components/InteractiveDiyas';
import ShareSection from './components/ShareSection';
import FireworksCanvas from './components/FireworksCanvas';
import ToranHeader from './components/ToranHeader';
import FloatingParticles from './components/FloatingParticles';
import { soundManager } from './utils/audio';
import { Volume2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const triggerBurstRef = useRef(null);

  const toggleMute = () => {
    const isPlaying = soundManager.toggleMute();
    setIsMuted(!isPlaying);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Subtle celebratory firework burst on reveal
    if (triggerBurstRef.current) {
      triggerBurstRef.current(window.innerWidth / 2, window.innerHeight * 0.3, 60, true);
      setTimeout(() => {
        if (triggerBurstRef.current) {
          triggerBurstRef.current(window.innerWidth * 0.28, window.innerHeight * 0.24, 40, true);
        }
      }, 350);
      setTimeout(() => {
        if (triggerBurstRef.current) {
          triggerBurstRef.current(window.innerWidth * 0.72, window.innerHeight * 0.24, 40, true);
        }
      }, 700);
    }
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#040307] text-[#e6dfd3] font-sans relative selection:bg-[#d4af37]/25 overflow-x-hidden w-full">
      {/* Interactive 60fps Fireworks Canvas across the website (Soft Champagne / Warm Gold) */}
      <FireworksCanvas triggerBurstRef={triggerBurstRef} />

      {/* Floating subtle golden embers & particles */}
      <FloatingParticles />

      {/* Hanging Festive Toran at top */}
      <ToranHeader />

      <AnimatePresence mode="wait">
        {showIntro ? (
          /* 1. CINEMATIC ANIMATED VIDEO-LIKE INTRO */
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className="w-full min-h-[100dvh]"
          >
            <AnimatedOpeningVideo
              onComplete={handleIntroComplete}
              isMuted={isMuted}
              toggleMute={toggleMute}
            />
          </motion.div>
        ) : (
          /* 2. REVEALED SINGLE-PAGE PREMIUM DIWALI GREETING EXPERIENCE */
          <motion.div
            key="celebration"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative w-full min-h-screen flex flex-col justify-between"
          >
            {/* Ambient Mehta Home Watermark Backdrop with Soft Blur */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.14] overflow-hidden">
              <img
                src="/mehta_home.jpg"
                alt="Mehta Residence Background"
                className="w-full h-full object-cover object-center filter blur-[4px] brightness-[0.7] contrast-[0.95] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#040307] via-[#08060d]/90 to-[#040307]" />
            </div>

            {/* Sticky Festive Navigation Bar with Song Player Pill */}
            <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0b0813]/80 border-b border-[#d4af37]/15 px-3 md:px-6 py-2.5 flex items-center justify-between shadow-sm">
              <div
                onClick={handleReplayIntro}
                className="flex items-center gap-2 cursor-pointer group"
                title="Replay Animated Intro"
              >
                <div className="w-7 h-7 rounded-full border border-[#d4af37]/35 flex items-center justify-center bg-[#d4af37]/10 group-hover:bg-[#d4af37]/20 transition-all">
                  <span className="text-xs">🪔</span>
                </div>
                <div>
                  <span className="cinzel text-xs md:text-sm font-semibold tracking-widest text-gold-shimmer block">
                    MEHTA FAMILY
                  </span>
                  <span className="text-[9px] text-[#dfca95]/60 font-light hidden sm:block">
                    Diwali Wishes 2026
                  </span>
                </div>
              </div>

              {/* Controls: Replay Video & Song Sound On/Off */}
              <div className="flex items-center gap-2 md:gap-2.5">
                <button
                  onClick={handleReplayIntro}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#171220]/70 border border-[#d4af37]/20 text-[#dfca95] text-xs font-medium hover:border-[#d4af37]/35 transition-all active:scale-95"
                >
                  <RotateCcw className="w-3 h-3 opacity-75" />
                  <span className="hidden sm:inline">Replay Intro</span>
                </button>

                <button
                  onClick={toggleMute}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171220]/80 border border-[#d4af37]/25 text-[#dfca95] text-xs font-medium hover:border-[#d4af37]/45 transition-all active:scale-95 shadow-sm"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3 h-3 text-[#dfca95]/60" />
                      <span className="text-[11px] md:text-xs">Song: Muted</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3 h-3 text-[#dfca95] animate-pulse" />
                      <span className="text-[11px] md:text-xs text-[#dfca95] font-medium flex items-center gap-1">
                        <span>🎵 Diwali Song</span>
                      </span>
                    </>
                  )}
                </button>
              </div>
            </header>

            {/* SINGLE PAGE CONTENT FLOW */}
            <main className="relative z-30 flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-3 sm:px-6 pt-4 pb-12 gap-7">
              
              {/* 1. HERO SHOWCASE: REAL MEHTA HOME PHOTOGRAPH */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                className="w-full max-w-xl mx-auto text-center"
              >
                <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/35 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(212,175,55,0.08)] group">
                  {/* Portrait photo of home */}
                  <img
                    src="/mehta_home.jpg"
                    alt="Mehta Family Residence decorated with lights"
                    className="w-full h-64 sm:h-80 md:h-96 object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000 filter brightness-[0.92] contrast-[1.02] saturate-[0.98]"
                  />
                  
                  {/* Soft subtle warm vignette overlay - no harsh black band */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040307]/90 via-[#040307]/25 to-transparent pointer-events-none" />

                  {/* Soft warm fairy lights on house */}
                  <div className="absolute top-[20%] left-[25%] w-2 h-2 rounded-full bg-[#f3e5c8] shadow-[0_0_8px_#d4af37] animate-twinkle" />
                  <div className="absolute top-[28%] right-[30%] w-2 h-2 rounded-full bg-[#dfba60] shadow-[0_0_8px_#d4af37] animate-twinkle delay-300" />
                  <div className="absolute top-[42%] left-[30%] w-2 h-2 rounded-full bg-[#f3e5c8] shadow-[0_0_8px_#d4af37] animate-twinkle delay-700" />
                  
                  {/* Bottom Home Details Card */}
                  <div className="absolute bottom-3.5 left-0 right-0 px-4 flex items-center justify-between">
                    <div className="text-left">
                      <p className="cursive text-xl sm:text-2xl text-[#f3e5c8] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        Welcome to Our Home
                      </p>
                      <h2 className="cinzel text-xs sm:text-sm font-semibold tracking-wider text-[#dfca95]">
                        MEHTA NIWAS
                      </h2>
                    </div>
                    
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120e1a]/80 backdrop-blur-md border border-[#d4af37]/25 text-[11px] text-[#dfca95] shadow-sm">
                      <Sparkles className="w-3 h-3 text-[#dfca95]/75 animate-spin" style={{ animationDuration: '6s' }} />
                      <span>Diwali Lights 🪔</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 2. MAIN DIWALI WISHES CARD (Hindi Message) */}
              <MainWishes />

              {/* 3. FAMILY NAMES SECTION */}
              <FamilySection />

              {/* 4. INTERACTIVE DIYA LIGHTING ALTAR */}
              <InteractiveDiyas />

              {/* 5. SHARE & SPREAD HAPPINESS SECTION */}
              <ShareSection onReplay={handleReplayIntro} />

            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
