import { useState } from 'react';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
}

const HeroSection = ({ onExplore }: HeroSectionProps) => {
  const [heartClicks, setHeartClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const handleHeartClick = () => {
    const newClicks = heartClicks + 1;
    setHeartClicks(newClicks);
    if (newClicks >= 5 && !showSecret) {
      setShowSecret(true);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
      {/* Glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
        style={{ background: 'var(--gradient-glow)' }}
      />
      
      <div className="text-center z-10 animate-fade-up">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Heart 
            className="w-8 h-8 text-primary fill-primary animate-heartbeat cursor-pointer hover:scale-125 transition-transform"
            onClick={handleHeartClick}
          />
        </div>
        
        {showSecret && (
          <div className="flex items-center justify-center gap-2 mb-4 animate-fade-up">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="font-body text-sm text-gold">You found a secret! You're so curious 💕</span>
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
        )}
        
        <p className="text-gold font-body text-lg tracking-[0.3em] uppercase mb-4">
          For My Love
        </p>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-foreground mb-6 leading-tight">
          Happy New Year,
          <br />
          <span className="text-gradient italic">My Darling</span>
        </h1>
        
        <p className="font-body text-muted-foreground text-lg md:text-xl max-w-lg mx-auto mb-8 leading-relaxed">
          Every moment with you has been a gift. As we step into 2026 together, 
          I wanted to create something special — just for us.
        </p>

        <p className="font-body text-primary/60 text-sm mb-12 animate-pulse">
          ✨ Click anywhere to spread love ✨
        </p>
        
        <button
          onClick={onExplore}
          className="group flex flex-col items-center gap-2 mx-auto text-primary hover:text-rose-light transition-colors duration-300"
        >
          <span className="font-body text-sm tracking-widest uppercase">
            Our Journey Together
          </span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
