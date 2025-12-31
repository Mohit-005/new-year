import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface RevealCardProps {
  frontText: string;
  backText: string;
  icon?: 'heart' | 'sparkles';
}

const InteractiveReveal = ({ frontText, backText, icon = 'heart' }: RevealCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div 
      className="relative cursor-pointer group perspective-1000"
      onClick={() => setIsRevealed(!isRevealed)}
    >
      <div 
        className={`relative transition-all duration-700 transform-style-preserve-3d ${
          isRevealed ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className={`bg-card/60 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 text-center transition-all duration-300 ${
          isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } group-hover:border-primary/50 group-hover:glow`}>
          <div className="flex items-center justify-center gap-2 mb-3">
            {icon === 'heart' ? (
              <Heart className="w-5 h-5 text-primary fill-primary animate-pulse-soft" />
            ) : (
              <Sparkles className="w-5 h-5 text-gold animate-pulse-soft" />
            )}
          </div>
          <p className="font-body text-muted-foreground">{frontText}</p>
          <p className="font-body text-xs text-primary/60 mt-3">Tap to reveal</p>
        </div>

        {/* Back */}
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-gold/20 backdrop-blur-sm border border-primary/40 rounded-2xl p-6 text-center transition-all duration-300 ${
          isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-primary fill-primary animate-heartbeat" />
          </div>
          <p className="font-display text-lg text-foreground italic">{backText}</p>
          <p className="font-body text-xs text-primary/60 mt-3">Tap to close</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveReveal;
