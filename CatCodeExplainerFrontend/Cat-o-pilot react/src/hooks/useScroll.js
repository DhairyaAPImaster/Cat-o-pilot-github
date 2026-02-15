import { useState, useEffect } from 'react';

export function useScrollCatAnimation() {
  const [currentFrame, setCurrentFrame] = useState(3); // Start from frame 3 (fourth frame)
  const totalFrames = 145;
  const frameOffset = 3; // Skip first 3 frames
  const totalCycle = totalFrames * 2; // Forward and backward

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercentage = scrolled / scrollHeight;
      const position = Math.floor(scrollPercentage * totalCycle);
      
      let frame;
      if (position < totalFrames) {
        // Forward: 2 to 144
        frame = Math.min(position + frameOffset, totalFrames - 1);
      } else {
        // Backward: 144 to 2
        frame = Math.max(totalCycle - position - 1 + frameOffset, frameOffset);
      }
      
      frame = Math.min(Math.max(frame, frameOffset), totalFrames - 1);
      setCurrentFrame(frame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalFrames, totalCycle, frameOffset]);

  const frameNumber = String(currentFrame + 1).padStart(3, '0');
  const imagePath = `/cat video scroll animation frames 24 fps/ezgif-frame-${frameNumber}.jpg`;
  const scrollProgress = currentFrame / totalFrames;

  return { imagePath, currentFrame, totalFrames, scrollProgress };
}

export function useHorizontalScroll(ref) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate when section enters and exits viewport
      const scrollableHeight = sectionHeight - viewportHeight;
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      
      const wrapper = element.querySelector('.horizontal-scroll-wrapper');
      if (wrapper) {
        const scrollWidth = wrapper.scrollWidth - window.innerWidth;
        wrapper.style.transform = `translateX(-${scrollProgress * scrollWidth}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
