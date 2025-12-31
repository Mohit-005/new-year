import { useRef, useState } from 'react';
import FloatingHearts from '@/components/FloatingHearts';
import Sparkles from '@/components/Sparkles';
import CursorSparkles from '@/components/CursorSparkles';
import ClickHearts from '@/components/ClickHearts';
import HeroSection from '@/components/HeroSection';
import MemoriesSection from '@/components/MemoriesSection';
import LoveLetterSection from '@/components/LoveLetterSection';
import InteractiveSection from '@/components/InteractiveSection';
import NewYearWish from '@/components/NewYearWish';
import PhotoGallery from '@/components/PhotoGallery';
import FireworksIntro from '@/components/FireworksIntro';

const Index = () => {
  const memoriesRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);

  const scrollToMemories = () => {
    memoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Fireworks intro */}
      {showIntro && <FireworksIntro onComplete={() => setShowIntro(false)} />}
      {/* Interactive effects */}
      <CursorSparkles />
      <ClickHearts />
      
      {/* Background effects */}
      <FloatingHearts />
      <Sparkles />
      
      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-0 left-0 right-0 h-[50vh]"
          style={{ background: 'linear-gradient(180deg, hsl(350 25% 8%) 0%, transparent 100%)' }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-[30vh]"
          style={{ background: 'linear-gradient(0deg, hsl(350 25% 8%) 0%, transparent 100%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection onExplore={scrollToMemories} />
        
        <div ref={memoriesRef}>
          <MemoriesSection />
        </div>
        
        <LoveLetterSection />
        
        <InteractiveSection />
        
        <PhotoGallery />
        
        <NewYearWish />
        
        {/* Footer */}
        <footer className="py-12 text-center">
          <p className="font-body text-muted-foreground text-sm">
            Made with all my love, for you ♥
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
