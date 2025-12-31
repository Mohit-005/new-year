import { useState, useEffect, useRef } from 'react';
import { Heart, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  caption: string;
  rotate: number;
}

const photos: Photo[] = [
  { id: 1, src: "/Pictures/IMG_20251231_113203_217.jpg", caption: "Sleeping together...", rotate: -3 },
  { id: 2, src: "/Pictures/IMG-20251211-WA0007.jpg", caption: "No. 1 vegetable buyer in the country", rotate: 2 },
  { id: 3, src: "/Pictures/photo_2025-12-31_19-42-42.jpg", caption: "Eyes on the road ma'am", rotate: -2 },
  { id: 4, src: "/Pictures/photo_2025-12-31_19-42-57.jpg", caption: "The kiss I love the most", rotate: 3 },
  { id: 5, src: "/Pictures/Screenshot_20251231_113559_WhatsApp.jpg", caption: "Doubting my loyalty", rotate: -1 },
  { id: 6, src: "/Pictures/Screenshot_20251231_113701_WhatsApp.jpg", caption: "Became a Grandma", rotate: 2 },
];

const PhotoGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPhoto) {
        setSelectedPhoto(null);
      }
    };

    if (selectedPhoto) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  const openPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    let newIndex: number;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(photos[newIndex]);
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-gold" />
            <p className="font-body text-gold text-sm tracking-[0.3em] uppercase">
              A Few Moments
            </p>
            <Camera className="w-5 h-5 text-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            A Gallery of You
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Every picture tells a story, but ours is my favorite tale ♥
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div 
                className="relative group cursor-pointer"
                style={{ transform: `rotate(${photo.rotate}deg)` }}
                onClick={() => openPhoto(photo)}
              >
                {/* Polaroid frame */}
                <div className="bg-cream/90 p-3 pb-12 rounded-sm shadow-elegant transition-all duration-300 group-hover:shadow-glow group-hover:scale-105">
                  {/* Photo */}
                  <div className="aspect-square rounded-sm relative overflow-hidden">
                    <img 
                      src={photo.src} 
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Hover overlay */}
                    <div className={`absolute inset-0 bg-primary/10 transition-opacity duration-300 flex items-center justify-center ${hoveredId === photo.id ? 'opacity-100' : 'opacity-0'}`}>
                      <Heart 
                        className={`w-8 h-8 transition-all duration-300 ${hoveredId === photo.id ? 'text-primary fill-primary scale-125' : 'text-primary/50 scale-100'}`}
                      />
                    </div>
                  </div>
                  
                  {/* Caption */}
                  <p className="absolute bottom-3 left-0 right-0 text-center font-body text-black text-sm italic">
                    {photo.caption}
                  </p>
                </div>

                {/* Decorative tape */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-gold/30 rotate-0" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closePhoto}
        >
          {/* Close button */}
          <button
            onClick={closePhoto}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto('prev');
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto('next');
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image container */}
          <div 
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.caption}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            
            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full">
              <p className="font-body text-black text-sm md:text-base text-center">
                {selectedPhoto.caption}
              </p>
            </div>

            {/* Photo counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="font-body text-white/80 text-xs">
                {photos.findIndex(p => p.id === selectedPhoto.id) + 1} / {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
