import { useEffect } from 'react';

export const useAnimatedFavicon = (gifPath: string, frameDelay: number = 100) => {
  useEffect(() => {
    // Remove all existing favicon links
    const existingFavicons = document.querySelectorAll("link[rel*='icon']");
    existingFavicons.forEach(fav => fav.remove());

    let counter = 0;
    
    // Create and update favicon periodically to force browser to reload the GIF
    const updateFavicon = () => {
      // Remove old favicon
      const oldFavicon = document.querySelector("link[rel*='icon']");
      if (oldFavicon) {
        oldFavicon.remove();
      }
      
      // Create new favicon with cache-busting query parameter
      const newFavicon = document.createElement('link');
      newFavicon.id = 'animated-favicon';
      newFavicon.rel = 'icon';
      newFavicon.type = 'image/gif';
      newFavicon.href = `${gifPath}?v=${counter}&t=${Date.now()}`;
      document.head.appendChild(newFavicon);
      
      counter++;
    };

    // Initial favicon
    updateFavicon();
    
    // Update periodically
    const intervalId = setInterval(updateFavicon, frameDelay);

    return () => {
      clearInterval(intervalId);
      const favicon = document.getElementById('animated-favicon');
      if (favicon) {
        favicon.remove();
      }
    };
  }, [gifPath, frameDelay]);
};

