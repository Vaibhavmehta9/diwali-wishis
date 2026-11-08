import React from 'react';
import { motion } from 'framer-motion';

export default function MainWishes() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1 }}
      className="relative w-full max-w-3xl mx-auto px-4 py-10 text-center"
    >
      {/* Decorative Traditional Rangoli Ring in the Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-96 h-80 md:h-96 pointer-events-none opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full text-amber-400 fill-current animate-spin" style={{ animationDuration: '60s' }}>
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <ellipse
              key={deg}
              cx="100"
              cy="40"
              rx="6"
              ry="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Main Ornate Blessing Card */}
      <div className="relative rounded-3xl p-6 md:p-10 bg-gradient-to-b from-[#181124]/90 via-[#0f0b18]/90 to-[#140d20]/95 backdrop-blur-xl border border-amber-500/30 shadow-[0_0_50px_rgba(255,180,0,0.2)] overflow-hidden">
        
        {/* Golden Corner Ornaments */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/80 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/80 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/80 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/80 rounded-br-lg" />

        {/* Shubh Labh Auspicious Top Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="hindi-title text-amber-300 text-sm md:text-base px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
            शुभ
          </span>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
          <span className="text-3xl filter drop-shadow-[0_0_12px_#FFD700]">🪔</span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
          <span className="hindi-title text-amber-300 text-sm md:text-base px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
            लाभ
          </span>
        </div>

        {/* Sacred Hindi Blessing Message */}
        <div className="my-4">
          <p className="hindi-title text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed md:leading-loose text-amber-100/95 tracking-wide">
            “दीपों की जगमगाहट आपके जीवन को खुशियों से रोशन करे, माँ लक्ष्मी की कृपा से घर में सुख, शांति और समृद्धि बनी रहे। आपके हर सपने को नई उड़ान मिले और हर दिन खुशियों से भरा रहे।”
          </p>
        </div>

        {/* Divider with Genda Flower Motif */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-amber-400 to-amber-500" />
          <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_#FFD700]" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-amber-400 to-amber-500" />
        </div>

        {/* Emphasized Greeting */}
        <div className="pt-2">
          <h2 className="hindi-title text-2xl md:text-4xl font-extrabold text-gold-shimmer tracking-wider drop-shadow-[0_2px_15px_rgba(255,215,0,0.5)]">
            आप सभी को दीपावली की हार्दिक शुभकामनाएँ!
          </h2>
        </div>

      </div>
    </motion.section>
  );
}

