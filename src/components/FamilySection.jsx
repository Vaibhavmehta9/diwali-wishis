import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function FamilySection() {
  const familyMembers = [
    { type: 'couple', names: ['GAUTAM', 'MAMTA'], subtitle: 'Elders & Pillars' },
    { type: 'couple', names: ['YASH', 'SUDHI'], subtitle: 'Blessings & Togetherness' },
    { type: 'single', name: 'NAVNEET' },
    { type: 'single', name: 'VAIBHAV' },
    { type: 'single', name: 'DAKSH' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1 }}
      className="relative w-full max-w-3xl mx-auto px-4 py-12 text-center"
    >
      {/* Header: With Love & Best Wishes From */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
          <span className="cursive text-3xl md:text-5xl text-amber-200 drop-shadow-[0_2px_12px_rgba(255,200,0,0.4)]">
            With Love & Best Wishes From
          </span>
          <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
        </div>
        <p className="text-xs md:text-sm text-amber-300/70 uppercase tracking-[0.25em] font-medium">
          Blessings From Our Family
        </p>
      </div>

      {/* Family Members Grid / Layout */}
      <div className="flex flex-col gap-4 max-w-xl mx-auto">
        {familyMembers.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative rounded-2xl p-4 md:p-5 bg-gradient-to-r from-amber-950/40 via-amber-900/30 to-amber-950/40 backdrop-blur-md border border-amber-500/30 hover:border-amber-400/70 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] flex items-center justify-center"
          >
            {/* Subtle glow background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 via-amber-400/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Diya icons flanking the names */}
            <span className="text-xl md:text-2xl mr-3 opacity-80 group-hover:opacity-100 transition-opacity filter drop-shadow-[0_0_8px_#FFD700]">
              🪔
            </span>

            {member.type === 'couple' ? (
              <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
                <span className="cinzel text-xl md:text-2xl lg:text-3xl font-extrabold tracking-widest text-gold-shimmer">
                  {member.names[0]}
                </span>
                <span className="text-amber-400/80 font-bold text-lg md:text-xl">
                  –
                </span>
                <span className="cinzel text-xl md:text-2xl lg:text-3xl font-extrabold tracking-widest text-gold-shimmer">
                  {member.names[1]}
                </span>
              </div>
            ) : (
              <span className="cinzel text-xl md:text-2xl lg:text-3xl font-extrabold tracking-widest text-gold-shimmer">
                {member.name}
              </span>
            )}

            <span className="text-xl md:text-2xl ml-3 opacity-80 group-hover:opacity-100 transition-opacity filter drop-shadow-[0_0_8px_#FFD700]">
              🪔
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom Signature: MEHTA FAMILY */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-8 pt-6 border-t border-amber-500/30 max-w-md mx-auto"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <h2 className="cinzel text-3xl md:text-5xl font-black tracking-[0.2em] text-gold-gradient drop-shadow-[0_4px_20px_rgba(255,200,0,0.6)]">
            MEHTA FAMILY
          </h2>
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <p className="text-xs md:text-sm text-amber-200/75 tracking-wider font-light">
          Wishing you health, wealth, joy and endless success
        </p>
      </motion.div>
    </motion.section>
  );
}

