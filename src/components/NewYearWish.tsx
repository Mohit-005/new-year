import { useEffect, useState, useRef } from 'react';
import { Heart, Star } from 'lucide-react';

const NewYearWish = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const wishes = [
    "More adventures together",
    "Endless laughter and joy",
    "Deeper love every day",
    "Dreams coming true",
    "Forever with you"
  ];

  return (
    <section ref={sectionRef} className="min-h-screen py-24 px-4 flex items-center justify-center relative">
      {/* Multiple glow layers */}
      <div 
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, hsl(var(--gold) / 0.4) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: 'var(--gradient-glow)' }}
      />

      <div className={`max-w-3xl mx-auto text-center relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <Star className="w-6 h-6 text-gold fill-gold animate-pulse-soft" />
          <Star className="w-4 h-4 text-gold fill-gold animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
          <Star className="w-6 h-6 text-gold fill-gold animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>

        <h2 className="font-display text-5xl md:text-7xl text-foreground mb-4">
          <span className="text-gradient">2026</span>
        </h2>
        
        <p className="font-display text-3xl md:text-4xl text-foreground italic mb-12">
          My Wishes For Us
        </p>

        <div className="grid gap-4 mb-12">
          {wishes.map((wish, index) => (
            <div 
              key={index}
              className={`flex items-center justify-center gap-3 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{ transitionDelay: `${index * 200 + 500}ms` }}
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="font-body text-lg text-foreground">
                {wish}
              </span>
            </div>
          ))}
        </div>

        <div className={`transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="inline-block bg-gradient-to-r from-primary/20 via-gold/20 to-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-8 py-4 glow">
            <p className="font-display text-2xl md:text-3xl text-foreground">
              Happy New Year, <span className="text-gradient italic">My Love</span> 
              <Heart className="inline w-6 h-6 text-primary fill-primary ml-2 animate-heartbeat" />
            </p>
          </div>
        </div>

        <p className="font-body text-muted-foreground mt-12 text-lg">
          Here's to another year of us. I love you endlessly. 💕
        </p>
      </div>
    </section>
  );
};

export default NewYearWish;
