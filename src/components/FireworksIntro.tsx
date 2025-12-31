import { useState, useEffect } from 'react';

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const FireworksIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [stars] = useState<Star[]>(() => 
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  );

  const [fireworks] = useState<Firework[]>(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 20 + Math.random() * 50,
      color: ['#f4a5b8', '#d4af37', '#ffd700', '#ff69b4', '#fff'][Math.floor(Math.random() * 5)],
      delay: 0.3 + i * 0.25,
    }))
  );

  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 3500);
    const completeTimer = setTimeout(() => onComplete(), 4500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#0a0a1a] transition-opacity duration-1000 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animation: `twinkle 2s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Fireworks */}
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="absolute"
          style={{
            left: `${fw.x}%`,
            top: `${fw.y}%`,
            animation: `firework-burst 1.5s ease-out forwards`,
            animationDelay: `${fw.delay}s`,
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: fw.color,
                boxShadow: `0 0 6px ${fw.color}, 0 0 12px ${fw.color}`,
                animation: `particle 1.5s ease-out forwards`,
                animationDelay: `${fw.delay}s`,
                transform: `rotate(${i * 30}deg) translateY(-60px)`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      ))}

      {/* Center message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 
          className="font-display text-4xl md:text-6xl text-white text-center"
          style={{
            animation: 'fade-up 1s ease-out 0.5s forwards',
            opacity: 0,
            textShadow: '0 0 30px rgba(212, 175, 55, 0.8)',
          }}
        >
          Happy New Year, My Love ✨
        </h1>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes firework-burst {
          0% { transform: scale(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes particle {
          0% { 
            opacity: 0;
            transform: rotate(var(--angle, 0deg)) translateY(0) scale(0);
          }
          20% { 
            opacity: 1;
            transform: rotate(var(--angle, 0deg)) translateY(-30px) scale(1);
          }
          100% { 
            opacity: 0;
            transform: rotate(var(--angle, 0deg)) translateY(-80px) scale(0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default FireworksIntro;
