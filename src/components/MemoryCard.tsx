import { Heart } from 'lucide-react';

interface MemoryCardProps {
  month: string;
  title: string;
  description: string;
  isVisible: boolean;
  index: number;
}

const MemoryCard = ({ month, title, description, isVisible, index }: MemoryCardProps) => {
  return (
    <div 
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline connector */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-gold/30 to-transparent" />
      
      <div className={`relative flex flex-col md:flex-row items-start gap-6 ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      }`}>
        {/* Timeline dot */}
        <div className="absolute left-0 md:left-1/2 top-6 -translate-x-1/2 z-10">
          <div className="w-4 h-4 rounded-full bg-primary glow animate-pulse-soft" />
        </div>
        
        {/* Card */}
        <div className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${
          index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
        }`}>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-primary fill-primary group-hover:animate-heartbeat" />
              <span className="font-body text-sm text-gold tracking-wider uppercase">
                {month}
              </span>
            </div>
            
            <h3 className="font-display text-2xl text-foreground mb-3 italic">
              {title}
            </h3>
            
            <p className="font-body text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
