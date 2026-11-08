import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ShareSection({ onReplay }) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    return typeof window !== 'undefined' ? window.location.href : 'https://mehta-family-diwali.web.app';
  };

  const shareText = `🪔 शुभ दीपावली! Mehta Family की तरफ से आपको और आपके पूरे परिवार को दीपावली की हार्दिक शुभकामनाएँ। इस खूबसूरत शुभकामना को देखने के लिए यहाँ क्लिक करें: ${getShareUrl()}`;

  const handleWhatsAppShare = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {
      console.warn(e);
    }
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      try {
        confetti({
          particleCount: 30,
          spread: 40,
          origin: { y: 0.85 },
        });
      } catch (e) {
        console.warn(e);
      }
    });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-2xl mx-auto px-4 pt-6 pb-16 text-center select-none"
    >
      {/* Slogan */}
      <div className="mb-6">
        <p className="cursive text-3xl md:text-4xl text-amber-200 drop-shadow-[0_2px_12px_rgba(255,200,0,0.4)] flex items-center justify-center gap-2">
          <span>Spread Happiness & Light This Diwali</span>
          <Heart className="w-6 h-6 text-red-400 fill-current inline-block animate-pulse" />
        </p>
        <p className="text-xs md:text-sm text-amber-300/70 mt-1">
          Share this special wish with your loved ones, relatives and friends
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
        {/* WhatsApp Share Button */}
        <button
          onClick={handleWhatsAppShare}
          className="group relative w-full sm:w-auto flex-1 flex items-center justify-center gap-3 py-3.5 px-6 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-semibold text-base shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] transition-all transform active:scale-95"
        >
          <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Share on WhatsApp</span>
        </button>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 hover:border-amber-400 text-amber-200 font-medium text-base shadow-lg transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300">Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 text-amber-400" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>

      {/* Replay Button */}
      <div className="mt-8">
        <button
          onClick={onReplay}
          className="inline-flex items-center gap-2 text-xs md:text-sm text-amber-300/60 hover:text-amber-200 transition-colors py-2 px-4 rounded-full border border-amber-500/20 hover:border-amber-400/40"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay Opening Celebration</span>
        </button>
      </div>

      {/* Decorative Footer Signature */}
      <div className="mt-10 pt-6 border-t border-amber-500/20 text-xs text-amber-400/60 flex flex-col items-center gap-1">
        <p className="cinzel tracking-widest text-amber-300/80 font-bold">
          MEHTA RESIDENCE • DIWALI CELEBRATION
        </p>
        <p>© 2026 With warm regards & heartfelt blessings from the Mehta Family</p>
      </div>
    </motion.footer>
  );
}

