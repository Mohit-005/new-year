import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface BurstHeart {
  id: number;
  x: number;
  y: number;
  angle: number;
  size: number;
}

const ClickHearts = () => {
  const [hearts, setHearts] = useState<BurstHeart[]>([]);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Don't capture clicks on interactive elements (buttons, links, etc.)
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        return;
      }

      const newHearts: BurstHeart[] = Array.from({ length: 10 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        angle: (360 / 10) * i,
        size: 24 + Math.random() * 20,
      }));

      setHearts(prev => [...prev, ...newHearts]);

      setTimeout(() => {
        setHearts(prev => prev.filter(h => !newHearts.some(nh => nh.id === h.id)));
      }, 1000);
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-40 pointer-events-none"
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{
            left: heart.x,
            top: heart.y,
            transform: 'translate(-50%, -50%)',
            animation: 'burst 1s ease-out forwards',
            '--angle': `${heart.angle}deg`,
          } as React.CSSProperties}
        >
          <Heart 
            size={heart.size} 
            className="text-primary fill-primary"
            style={{ 
              filter: 'drop-shadow(0 0 8px hsl(350, 60%, 65%))',
            }}
          />
        </div>
      ))}
      
      <style>{`
        @keyframes burst {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-100px) scale(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ClickHearts;
