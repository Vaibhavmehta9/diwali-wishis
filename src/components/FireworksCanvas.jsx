import React, { useEffect, useRef } from 'react';
import { festiveAudio } from '../utils/audio';

export default function FireworksCanvas({ triggerBurstRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      '#FFD700', // Gold
      '#FFA500', // Saffron / Orange
      '#FF3366', // Rose Pink
      '#FF4500', // Deep Orange
      '#00FFCC', // Cyan
      '#FFE066', // Light Gold
      '#FF9900', // Bright Amber
      '#FF69B4', // Hot Pink
      '#E6C200', // Antique Gold
    ];

    class Particle {
      constructor(x, y, color, speed, angle) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 2.4 + 1.2;
        this.speed = speed;
        this.angle = angle;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.gravity = 0.055;
        this.friction = 0.965;
        this.alpha = 1;
        this.decay = Math.random() * 0.016 + 0.012;
      }

      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw(c) {
        c.save();
        c.globalAlpha = Math.max(0, this.alpha);
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.shadowBlur = 12;
        c.shadowColor = this.color;
        c.fill();
        c.restore();
      }
    }

    class FireworkRocket {
      constructor(targetX, targetY) {
        this.x = targetX + (Math.random() * 60 - 30);
        this.y = height + 10;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = Math.random() * 3 + 11;
        const angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.exploded = false;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.vy >= 0 || this.y <= this.targetY) {
          this.exploded = true;
        }
      }

      draw(c) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        c.fillStyle = '#FFF7D6';
        c.shadowBlur = 14;
        c.shadowColor = this.color;
        c.fill();
        c.restore();
      }
    }

    let particles = [];
    let rockets = [];

    const createBurst = (x, y, count = 45, sound = false) => {
      const burstColor = colors[Math.floor(Math.random() * colors.length)];
      const secondaryColor = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6.5 + 1.5;
        const color = Math.random() > 0.4 ? burstColor : secondaryColor;
        particles.push(new Particle(x, y, color, speed, angle));
      }
      if (sound) {
        festiveAudio.playFireworkBurst();
      }
    };

    if (triggerBurstRef) {
      triggerBurstRef.current = (x = width / 2, y = height * 0.35, count = 70, sound = true) => {
        createBurst(x, y, count, sound);
      };
    }

    // Interactive burst anywhere clicked on document unless clicking button/interactive item
    const handleGlobalClick = (e) => {
      // If clicking button or link, let it handle its own interaction
      if (e.target.closest('button, a, input, [role="button"]')) {
        return;
      }
      createBurst(e.clientX, e.clientY, 40, true);
    };

    window.addEventListener('pointerdown', handleGlobalClick);

    // Occasional automatic fireworks in background
    let lastAutoFire = Date.now();
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now - lastAutoFire > 2500 + Math.random() * 2000) {
        const x = Math.random() * (width * 0.8) + width * 0.1;
        const y = Math.random() * (height * 0.45) + height * 0.08;
        rockets.push(new FireworkRocket(x, y));
        lastAutoFire = now;
      }

      // Update & draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.update();
        r.draw(ctx);
        if (r.exploded) {
          createBurst(r.x, r.y, 45, false);
          rockets.splice(i, 1);
        }
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handleGlobalClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [triggerBurstRef]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
    />
  );
}
