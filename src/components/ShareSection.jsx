import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ShareSection({ onReplay }) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    return typeof window !== 'undefined' ? window.location.href : 'https://diwali-wishis.vercel.app';
  };

  const shareText = `🪔 शुभ दीपावली! Mehta Family की तरफ से आपको और आपके पूरे परिवार को दीपावली की हार्दिक शुभकामनाएँ। इस खूबसूरत शुभकामना को देखने के लिए यहाँ क्लिक करें: ${getShareUrl()}`;

  const handleWhatsAppShare = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.8 },
        colors: ['#F3E5C8', '#D4AF37', '#DFB850'],
      });
    } catch (e) {}
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
      try {
        confetti({
          particleCount: 25,
          spread: 35,
          origin: { y: 0.85 },
          colors: ['#F3E5C8', '#D4AF37'],
        });
      } catch (e) {}
    });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-2xl mx-auto px-4 pt-5 pb-14 text-center select-none"
    >
      {/* Slogan */}
      <div className="mb-5">
        <p className="cursive text-3xl md:text-4xl text-[#e8dcb5] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] flex items-center justify-center gap-2">
          <span>Spread Happiness & Light This Diwali</span>
          <span className="text-xl opacity-80">🤍</span>
        </p>
        <p className="text-[11px] md:text-xs text-[#dfca95]/60 mt-1">
          Share this special greeting with your loved ones, relatives and friends
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
        {/* WhatsApp Share Button - Elegant Forest Emerald & Gold */}
        <button
          onClick={handleWhatsAppShare}
          className="group relative w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 py-3 px-6 rounded-full bg-gradient-to-r from-[#1b5e39] via-[#1e6f43] to-[#1b5e39] hover:from-[#1e6f43] hover:to-[#227e4c] text-[#f4efe6] font-medium text-sm md:text-base border border-[#48bb78]/30 shadow-[0_4px_18px_rgba(27,94,57,0.35)] transition-all transform active:scale-95"
        >
          <Share2 className="w-4 h-4 opacity-85 group-hover:rotate-12 transition-transform" />
          <span>Share on WhatsApp</span>
        </button>

        {/* Copy Link Button - Muted Dark Bronze Glass */}
        <button
          onClick={handleCopyLink}
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#16111f]/80 hover:bg-[#1d1629]/90 border border-[#d4af37]/30 hover:border-[#d4af37]/50 text-[#dfca95] font-medium text-sm md:text-base shadow-sm transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#81e6d9]" />
              <span className="text-[#81e6d9]">Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 opacity-75" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>

      {/* Replay Button */}
      <div className="mt-7">
        <button
          onClick={onReplay}
          className="inline-flex items-center gap-1.5 text-xs text-[#dfca95]/50 hover:text-[#dfca95] transition-colors py-1.5 px-3.5 rounded-full border border-[#d4af37]/15 hover:border-[#d4af37]/35"
        >
          <RotateCcw className="w-3 h-3 opacity-75" />
          <span>Replay Celebration Video</span>
        </button>
      </div>

      {/* Decorative Footer Signature */}
      <div className="mt-9 pt-5 border-t border-[#d4af37]/15 text-[11px] text-[#dfca95]/50 flex flex-col items-center gap-1">
        <p className="cinzel tracking-widest text-[#dfca95]/70 font-semibold">
          MEHTA RESIDENCE • DIWALI CELEBRATION
        </p>
        <p>© 2026 With warm regards & heartfelt blessings from the Mehta Family</p>
      </div>
    </motion.footer>
  );
}
