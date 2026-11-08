import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function FamilySection() {
  const familyMembers = [
    { type: 'couple', names: ['GAUTAM', 'MAMTA'] },
    { type: 'couple', names: ['YASH', 'SUDHI'] },
    { type: 'single', name: 'NAVNEET' },
    { type: 'single', name: 'VAIBHAV' },
    { type: 'single', name: 'DAKSH' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative w-full max-w-3xl mx-auto px-4 py-8 text-center"
    >
      {/* Header: With Love & Best Wishes From */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="cursive text-3xl md:text-5xl text-[#e8dcb5] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            With Love & Best Wishes From
          </span>
        </div>
        <p className="text-[11px] md:text-xs text-[#dfca95]/60 uppercase tracking-[0.25em] font-medium">
          Mehta Family Blessings
        </p>
      </div>

      {/* Family Members Grid / Layout */}
      <div className="flex flex-col gap-3 max-w-xl mx-auto">
        {familyMembers.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            whileHover={{ scale: 1.015 }}
            className="group relative rounded-2xl p-3.5 md:p-4 bg-gradient-to-r from-[#140f1c]/70 via-[#181222]/80 to-[#140f1c]/70 backdrop-blur-md border border-[#d4af37]/15 hover:border-[#d4af37]/40 transition-all duration-300 shadow-[0_4px_18px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_22px_rgba(212,175,55,0.12)] flex items-center justify-center"
          >
            {/* Subtle soft warm hover glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/[0.04] to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Subtle diya accent */}
            <span className="text-lg md:text-xl mr-3 opacity-60 group-hover:opacity-90 transition-opacity">
              🪔
            </span>

            {member.type === 'couple' ? (
              <div className="flex items-center gap-2 md:gap-3.5 flex-wrap justify-center">
                <span className="cinzel text-lg md:text-2xl font-bold tracking-[0.16em] text-gold-shimmer">
                  {member.names[0]}
                </span>
                <span className="text-[#dfca95]/50 font-light text-base md:text-lg">
                  –
                </span>
                <span className="cinzel text-lg md:text-2xl font-bold tracking-[0.16em] text-gold-shimmer">
                  {member.names[1]}
                </span>
              </div>
            ) : (
              <span className="cinzel text-lg md:text-2xl font-bold tracking-[0.16em] text-gold-shimmer">
                {member.name}
              </span>
            )}

            <span className="text-lg md:text-xl ml-3 opacity-60 group-hover:opacity-90 transition-opacity">
              🪔
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom Signature: MEHTA FAMILY */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-7 pt-5 border-t border-[#d4af37]/15 max-w-md mx-auto"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-[#dfca95]/60 animate-spin" style={{ animationDuration: '8s' }} />
          <h2 className="cinzel text-2xl md:text-4xl font-extrabold tracking-[0.2em] text-gold-gradient drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            MEHTA FAMILY
          </h2>
          <Sparkles className="w-4 h-4 text-[#dfca95]/60 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <p className="text-[11px] md:text-xs text-[#dfca95]/60 tracking-wider font-light">
          Wishing you health, peace, happiness and eternal prosperity
        </p>
      </motion.div>
    </motion.section>
  );
}
