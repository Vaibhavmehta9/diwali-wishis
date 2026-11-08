import React from 'react';
import { motion } from 'framer-motion';

export default function MainWishes() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative w-full max-w-3xl mx-auto px-4 py-8 text-center"
    >
      {/* Decorative Traditional Rangoli Ring in the Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-96 h-80 md:h-96 pointer-events-none opacity-[0.12]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#d4af37] fill-current animate-spin" style={{ animationDuration: '75s' }}>
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <ellipse
              key={deg}
              cx="100"
              cy="40"
              rx="5"
              ry="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Main Ornate Blessing Card - Refined Luxury Glass */}
      <div className="relative rounded-3xl p-6 md:p-10 glass-panel-luxury overflow-hidden">
        
        {/* Subtle Delicate Corner Accents */}
        <div className="absolute top-3.5 left-3.5 w-6 h-6 border-t border-l border-[#d4af37]/40 rounded-tl" />
        <div className="absolute top-3.5 right-3.5 w-6 h-6 border-t border-r border-[#d4af37]/40 rounded-tr" />
        <div className="absolute bottom-3.5 left-3.5 w-6 h-6 border-b border-l border-[#d4af37]/40 rounded-bl" />
        <div className="absolute bottom-3.5 right-3.5 w-6 h-6 border-b border-r border-[#d4af37]/40 rounded-br" />

        {/* Shubh Labh Auspicious Top Header */}
        <div className="flex items-center justify-center gap-3.5 mb-5">
          <span className="hindi-title text-[#dfca95] text-xs md:text-sm px-3 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 tracking-wide">
            शुभ
          </span>
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/50" />
          <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">🪔</span>
          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/50" />
          <span className="hindi-title text-[#dfca95] text-xs md:text-sm px-3 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 tracking-wide">
            लाभ
          </span>
        </div>

        {/* Sacred Hindi Blessing Message - Gentle Ivory & Champagne */}
        <div className="my-3">
          <p className="hindi-title text-lg md:text-2xl lg:text-[26px] font-normal leading-relaxed md:leading-loose text-[#e8dfd1] tracking-wide">
            “दीपों की जगमगाहट आपके जीवन को खुशियों से रोशन करे, माँ लक्ष्मी की कृपा से घर में सुख, शांति और समृद्धि बनी रहे। आपके हर सपने को नई उड़ान मिले और हर दिन खुशियों से भरा रहे।”
          </p>
        </div>

        {/* Subtle Divider */}
        <div className="flex items-center justify-center gap-3 my-5">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-[#d4af37]/60" />
          <div className="w-2 h-2 rounded-full bg-[#d4af37]/70 shadow-[0_0_6px_rgba(212,175,55,0.5)]" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-[#d4af37]/40 to-[#d4af37]/60" />
        </div>

        {/* Emphasized Greeting in Champagne Gold Shimmer */}
        <div className="pt-1">
          <h2 className="hindi-title text-xl md:text-3xl lg:text-4xl font-semibold text-gold-shimmer tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            आप सभी को दीपावली की हार्दिक शुभकामनाएँ!
          </h2>
        </div>

      </div>
    </motion.section>
  );
}
