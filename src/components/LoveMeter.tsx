import { useState } from 'react';
import { Heart } from 'lucide-react';

const LoveMeter = () => {
  const [loveLevel, setLoveLevel] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const maxLevel = 100;

  const addLove = () => {
    // Use functional update to always get latest state
    setLoveLevel(prev => {
      if (prev >= maxLevel) return prev;
      
      const increment = 10 + Math.floor(Math.random() * 15);
      return Math.min(prev + increment, maxLevel);
    });
    
    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getMessage = () => {
    if (loveLevel === 0) return "Tap the heart to fill it with love!";
    if (loveLevel < 30) return "More love incoming...";
    if (loveLevel < 60) return "The love is growing!";
    if (loveLevel < 90) return "Almost overflowing!";
    return "My heart is completely full of love for you! 💕";
  };

  return (
    <div className="text-center py-8">
      <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-6">
        How Much Do I Love You?
      </p>
      
      {/* Heart container */}
      <button 
        type="button"
        className="relative inline-flex items-center justify-center cursor-pointer bg-transparent border-none p-4 touch-manipulation w-[120px] h-[120px] z-50"
        onClick={(e) => {
          e.stopPropagation();
          addLove();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addLove();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        style={{ minWidth: '120px', minHeight: '120px', position: 'relative' }}
      >
        {/* Background heart */}
        <Heart 
          size={120} 
          className="absolute text-muted/30 transition-transform duration-200 pointer-events-none"
          style={{ transform: isAnimating ? 'scale(1.1)' : 'scale(1)' }}
        />
        
        {/* Filled heart with clip */}
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden transition-all duration-500 pointer-events-none"
          style={{ 
            clipPath: `inset(${100 - loveLevel}% 0 0 0)`,
          }}
        >
          <Heart 
            size={120} 
            className="text-primary fill-primary"
            style={{ 
              filter: loveLevel >= 100 ? 'drop-shadow(0 0 20px hsl(350, 60%, 65%))' : 'none',
            }}
          />
        </div>

        {/* Glow effect at full */}
        {loveLevel >= 100 && (
          <div className="absolute inset-0 flex items-center justify-center animate-pulse-soft pointer-events-none">
            <Heart 
              size={120} 
              className="text-primary fill-primary opacity-50"
              style={{ filter: 'blur(10px)' }}
            />
          </div>
        )}
      </button>

      {/* Level indicator */}
      <div className="mt-6">
        <div className="w-48 h-2 bg-muted/30 rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-gold rounded-full transition-all duration-500"
            style={{ width: `${loveLevel}%` }}
          />
        </div>
        <p className="font-display text-2xl text-foreground mt-4">
          {loveLevel}%
        </p>
      </div>

      {/* Message */}
      <p className="font-body text-muted-foreground mt-4 max-w-xs mx-auto">
        {getMessage()}
      </p>

      {loveLevel >= 100 && (
        <button
          onClick={() => setLoveLevel(0)}
          className="mt-4 font-body text-sm text-primary/60 hover:text-primary transition-colors"
        >
          Reset & feel the love again
        </button>
      )}
    </div>
  );
};

export default LoveMeter;
