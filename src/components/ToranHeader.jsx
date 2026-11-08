import React from 'react';

export default function ToranHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none overflow-hidden select-none">
      {/* Hanging fairy string lights with twinkling bulbs */}
      <div className="flex justify-around items-start w-full px-2 pt-0">
        {[...Array(16)].map((_, i) => {
          const wireHeights = [24, 40, 18, 48, 28, 36, 16, 44, 22, 38, 26, 46, 18, 32, 20, 42];
          const height = wireHeights[i % wireHeights.length];
          const delay = (i * 0.18) % 2;
          const bulbColors = ['#FFD700', '#FF9900', '#FF3366', '#00FFCC', '#FFCC00'];
          const color = bulbColors[i % bulbColors.length];

          return (
            <div key={i} className="flex flex-col items-center">
              {/* String line */}
              <div
                className="w-[1px] bg-gradient-to-b from-amber-400/80 to-amber-200/40"
                style={{ height: `${height}px` }}
              />
              {/* Glowing Bulb */}
              <div
                className="w-2.5 h-3.5 rounded-full animate-twinkle shadow-lg"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 12px ${color}, 0 0 20px ${color}`,
                  animationDelay: `${delay}s`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Decorative Traditional Toran Swag */}
      <div className="w-full flex justify-between items-start -mt-1 px-1 opacity-90">
        <svg viewBox="0 0 1200 45" className="w-full h-8 md:h-12 text-amber-500 fill-current preserve-3d" preserveAspectRatio="none">
          {/* Garland scallops */}
          <path
            d="M0,0 Q100,35 200,0 Q300,35 400,0 Q500,35 600,0 Q700,35 800,0 Q900,35 1000,0 Q1100,35 1200,0"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeDasharray="4 2"
          />
          {/* Marigold flowers hanging */}
          {[100, 300, 500, 700, 900, 1100].map((cx, idx) => (
            <g key={idx}>
              {/* Mango Leaf */}
              <path
                d={`M${cx},15 C${cx - 10},28 ${cx - 5},38 ${cx},42 C${cx + 5},38 ${cx + 10},28 ${cx},15 Z`}
                fill="#15803d"
              />
              {/* Genda Phool Marigold */}
              <circle cx={cx} cy="22" r="7" fill="#F97316" />
              <circle cx={cx} cy="22" r="4.5" fill="#FBBF24" />
              <circle cx={cx} cy="22" r="2" fill="#FEF08A" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

