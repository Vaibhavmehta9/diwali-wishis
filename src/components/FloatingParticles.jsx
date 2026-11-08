import React, { useMemo } from 'react';

export default function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      top: Math.random() * 95 + 2,
      size: Math.random() * 3 + 1.2,
      duration: Math.random() * 7 + 4.5,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.45 + 0.15,
      drift: Math.random() * 20 - 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-tr from-amber-200/80 via-yellow-100/70 to-amber-300/40 animate-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: '0 0 8px rgba(212, 175, 55, 0.4), 0 0 14px rgba(212, 175, 55, 0.18)',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
