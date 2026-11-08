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
import { Volume2, VolumeX, Sparkles, Play, RotateCcw } from 'lucide-react';

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
    // Trigger celebratory grand fireworks burst
    if (triggerBurstRef.current) {
      triggerBurstRef.current(window.innerWidth / 2, window.innerHeight * 0.3, 75, true);
      setTimeout(() => {
        if (triggerBurstRef.current) {
          triggerBurstRef.current(window.innerWidth * 0.25, window.innerHeight * 0.25, 50, true);
        }
      }, 350);
      setTimeout(() => {
        if (triggerBurstRef.current) {
          triggerBurstRef.current(window.innerWidth * 0.75, window.innerHeight * 0.25, 50, true);
        }
      }, 700);
    }
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050408] text-amber-100 font-sans relative selection:bg-amber-500/30 overflow-x-hidden w-full">
      {/* Interactive 60fps Fireworks Canvas across the website */}
      <FireworksCanvas triggerBurstRef={triggerBurstRef} />

      {/* Floating subtle golden embers & particles */}
      <FloatingParticles />

      {/* Hanging Festive Toran at top */}
      <ToranHeader />

      <AnimatePresence mode="wait">
        {showIntro ? (
          /* 1. CINEMATIC ANIMATED VIDEO-LIKE INTRO (Like reference website) */
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative w-full min-h-screen flex flex-col justify-between"
          >
            {/* Ambient Mehta Home Watermark Backdrop */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
              <img
                src="/mehta_home.jpg"
                alt="Mehta Residence Background"
                className="w-full h-full object-cover object-center filter blur-[3px] brightness-70 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050408]/90 via-[#0a0612]/95 to-[#050408]" />
            </div>

            {/* Sticky Festive Navigation Bar with Song Player Pill */}
            <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090610]/85 border-b border-amber-500/20 px-3 md:px-6 py-2.5 flex items-center justify-between shadow-lg">
              <div
                onClick={handleReplayIntro}
                className="flex items-center gap-2 cursor-pointer group"
                title="Replay Animated Intro"
              >
                <div className="w-8 h-8 rounded-full border border-amber-400/50 flex items-center justify-center bg-amber-500/10 group-hover:bg-amber-500/20 transition-all">
                  <span className="text-sm">🪔</span>
                </div>
                <div>
                  <span className="cinzel text-xs md:text-sm font-bold tracking-widest text-gold-shimmer block">
                    MEHTA FAMILY
                  </span>
                  <span className="text-[10px] text-amber-300/70 font-light hidden sm:block">
                    Diwali Wishes 2026
                  </span>
                </div>
              </div>

              {/* Controls: Replay Video & Song Sound On/Off */}
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={handleReplayIntro}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-200 text-xs font-medium hover:border-amber-400 transition-all active:scale-95"
                >
                  <RotateCcw className="w-3 h-3 text-amber-400" />
                  <span className="hidden sm:inline">Replay Intro</span>
                </button>

                <button
                  onClick={toggleMute}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-amber-400/40 text-amber-200 text-xs font-medium hover:border-amber-300 transition-all active:scale-95 shadow-md"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-amber-400/70" />
                      <span className="text-[11px] md:text-xs">Song: Muted</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                      <span className="text-[11px] md:text-xs text-amber-300 font-semibold flex items-center gap-1">
                        <span>🎵 Diwali Song</span>
                      </span>
                    </>
                  )}
                </button>
              </div>
            </header>

            {/* SINGLE PAGE CONTENT FLOW */}
            <main className="relative z-30 flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-3 sm:px-6 pt-4 pb-12 gap-8">

              {/* 1. HERO SHOWCASE: REAL MEHTA HOME PHOTOGRAPH */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-xl mx-auto text-center"
              >
                <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/60 shadow-[0_0_40px_rgba(255,200,0,0.4)] group">
                  {/* Portrait photo of home */}
                  <img
                    src="/mehta_home.jpg"
                    alt="Mehta Family Residence decorated with lights"
                    className="w-full h-64 sm:h-80 md:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-1000 filter brightness-[0.95] contrast-[1.05]"
                  />

                  {/* Subtle warm glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                  {/* Twinkling fairy accent lights */}
                  <div className="absolute top-[20%] left-[25%] w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_12px_#FFD700] animate-twinkle" />
                  <div className="absolute top-[28%] right-[30%] w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#00FFFF] animate-twinkle delay-300" />
                  <div className="absolute top-[42%] left-[30%] w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_10px_#FF1493] animate-twinkle delay-700" />
                  
                  {/* Bottom Home Details Card */}
                  <div className="absolute bottom-3 left-0 right-0 px-4 flex items-center justify-between">
                    <div className="text-left">
                      <p className="cursive text-xl sm:text-2xl text-amber-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        Welcome to Our Home
                      </p>
                      <h2 className="cinzel text-sm sm:text-base font-bold text-amber-300 tracking-wider">
                        MEHTA NIWAS
                      </h2>
                    </div>
                    
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 text-[11px] text-amber-200 shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
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
