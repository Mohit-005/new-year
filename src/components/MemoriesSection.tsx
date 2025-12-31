import { useEffect, useState, useRef } from 'react';
import MemoryCard from './MemoryCard';

const memories = [
  {
    month: "The Beginning",
    title: "When Our Story Started",
    description: "That magical moment when our paths crossed and everything changed. The way you smiled, the sound of your laugh — I knew right then you were special."
  },
  {
    month: "First Adventures",
    title: "Learning Each Other",
    description: "Every conversation felt like unwrapping a gift. Your thoughts, your dreams, your quirks — I fell deeper with every discovery."
  },
  {
    month: "Growing Closer",
    title: "Building Our World",
    description: "The inside jokes, the comfortable silences, the way you fit perfectly in my arms. We were becoming an 'us'."
  },
  {
    month: "The Little Things",
    title: "Falling in Love Daily",
    description: "Your morning texts, your late-night calls, the way you remember small details about me. You make every ordinary day extraordinary."
  },
  {
    month: "Right Now",
    title: "Here With You",
    description: "And now, as we stand at the edge of a new year, I look at you and see my future. Every moment has led us here, together."
  }
];

const MemoriesSection = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(memories.length).fill(false));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('.memory-trigger');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
            Our Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground italic">
            A Few Months of Magic
          </h2>
        </div>

        <div className="space-y-12">
          {memories.map((memory, index) => (
            <div key={index} className="memory-trigger" data-index={index}>
              <MemoryCard
                month={memory.month}
                title={memory.title}
                description={memory.description}
                isVisible={visibleCards[index]}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoriesSection;
