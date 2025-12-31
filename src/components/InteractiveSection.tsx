import { useEffect, useState, useRef } from 'react';
import InteractiveReveal from './InteractiveReveal';
import LoveMeter from './LoveMeter';
import CountdownTimer from './CountdownTimer';

const loveNotes = [
  { front: "What I love most about you...", back: "The way your eyes light up when you smile" },
  { front: "My favorite moment with you...", back: "Every quiet moment we share together" },
  { front: "You make me feel...", back: "Like the luckiest person in the world" },
  { front: "I can't wait to...", back: "Create a million more memories with you" },
];

const InteractiveSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative">
      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15"
        style={{ background: 'var(--gradient-glow)' }}
      />

      <div className={`max-w-4xl mx-auto relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Countdown */}
        <div className="mb-20">
          <CountdownTimer />
        </div>

        {/* Love Notes Grid */}
        <div className="mb-20">
          <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-8 text-center">
            Tap To Reveal My Heart
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loveNotes.map((note, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <InteractiveReveal
                  frontText={note.front}
                  backText={note.back}
                  icon={index % 2 === 0 ? 'heart' : 'sparkles'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Love Meter */}
        <LoveMeter />
      </div>
    </section>
  );
};

export default InteractiveSection;
