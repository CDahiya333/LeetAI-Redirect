'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Confetti particle interface
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  rotation: number;
  rotationSpeed: number;
}

export default function SuccessMessage() {
  const [isClient, setIsClient] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  // Initialize confetti animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particleCount = 150;
    const colors = ['#ff0d75', '#f8e71c', '#50e3c2', '#4a90e2', '#9013fe'];
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 1,
        angle: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.2 - 0.1,
      });
    }

    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      if (!canvasRef.current) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeParticles = false;

      particlesRef.current.forEach((particle) => {
        particle.y += particle.speed;
        particle.x += Math.sin(particle.angle) * 2;
        particle.rotation += particle.rotationSpeed;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();

        if (particle.y < canvas.height) {
          activeParticles = true;
        } else {
          // Reset particle when it goes out of bounds
          particle.y = -20;
          particle.x = Math.random() * canvas.width;
        }
      });

      if (activeParticles) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-screen w-full bg-black text-white text-center p-6 relative"
    >
      {/* Canvas for confetti */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

      <motion.div className="z-10 max-w-2xl">
        <motion.h2
          className="text-2xl font-bold mb-10 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          LeetAI
        </motion.h2>

        <motion.h1
          className="text-5xl font-extrabold mb-8 tracking-wide drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Thank You for Joining LeetAI!
        </motion.h1>

        <motion.p
          className="text-xl font-light mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your email has been authenticated successfully. We&apos;re excited to have you on board.
        </motion.p>

        <motion.p
          className="text-xl font-light mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Good luck on your DSA journey! We&apos;re here to help you ace your coding interviews.
        </motion.p>

        <motion.div
          className="mt-10 text-sm opacity-70 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Made with ❤️ by the LeetAI Team
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
