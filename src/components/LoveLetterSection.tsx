import { useEffect, useState, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const LoveLetterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style={{ background: 'var(--gradient-glow)' }}
      />

      <div className={`max-w-2xl mx-auto text-center relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="flex items-center justify-center gap-2 mb-8">
          <Sparkles className="w-5 h-5 text-gold" />
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">
            From My Heart
          </span>
          <Sparkles className="w-5 h-5 text-gold" />
        </div>

        <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 md:p-12 glow">
          <Heart className="w-10 h-10 text-primary fill-primary mx-auto mb-6 animate-heartbeat" />
          
          <p className="font-display text-2xl md:text-3xl text-foreground italic leading-relaxed mb-6">
            "You are my favorite hello and my hardest goodbye. 
            Every day with you feels like the best day of my life."
          </p>
          
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            Thank you for being you. Thank you for choosing me. Thank you for making 
            these past months the happiest of my life. I can't wait to see what adventures 
            2025 brings us.
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveLetterSection;
