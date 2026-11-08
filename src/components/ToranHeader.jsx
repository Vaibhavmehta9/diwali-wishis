import React from 'react';

export default function ToranHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none overflow-hidden select-none opacity-85">
      {/* Hanging warm fairy lights - Soft champagne and warm amber */}
      <div className="flex justify-around items-start w-full px-2 pt-0">
        {[...Array(16)].map((_, i) => {
          const wireHeights = [20, 34, 16, 40, 24, 30, 14, 36, 18, 32, 22, 38, 16, 28, 18, 35];
          const height = wireHeights[i % wireHeights.length];
          const delay = (i * 0.22) % 3;
          // Elegant monochrome warm gold & champagne palette instead of rainbow neon
          const bulbColors = ['#D4AF37', '#E5C158', '#C59B27', '#F0D68A', '#DFB850'];
          const color = bulbColors[i % bulbColors.length];

          return (
            <div key={i} className="flex flex-col items-center">
              {/* Refined delicate golden wire */}
              <div
                className="w-[1px] bg-gradient-to-b from-amber-200/50 via-amber-400/25 to-transparent"
                style={{ height: `${height}px` }}
              />
              {/* Subtle warm micro bulb */}
              <div
                className="w-2 h-2.5 rounded-full animate-twinkle"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}88, 0 0 14px ${color}44`,
                  animationDelay: `${delay}s`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Subtle traditional toran outline in muted deep gold */}
      <div className="w-full flex justify-between items-start -mt-0.5 px-1 opacity-70">
        <svg viewBox="0 0 1200 40" className="w-full h-6 md:h-9 text-amber-600/70 fill-current preserve-3d" preserveAspectRatio="none">
          {/* Garland scallops */}
          <path
            d="M0,0 Q100,28 200,0 Q300,28 400,0 Q500,28 600,0 Q700,28 800,0 Q900,28 1000,0 Q1100,28 1200,0"
            fill="none"
            stroke="rgba(212, 175, 55, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          {/* Subtle hanging elements */}
          {[100, 300, 500, 700, 900, 1100].map((cx, idx) => (
            <g key={idx}>
              {/* Deep emerald muted leaf */}
              <path
                d={`M${cx},10 C${cx - 7},22 ${cx - 3},30 ${cx},34 C${cx + 3},30 ${cx + 7},22 ${cx},10 Z`}
                fill="#164e32"
                opacity="0.85"
              />
              {/* Warm marigold flower */}
              <circle cx={cx} cy="16" r="4.5" fill="#c27803" />
              <circle cx={cx} cy="16" r="2.8" fill="#d99b26" />
              <circle cx={cx} cy="16" r="1.2" fill="#fde68a" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
