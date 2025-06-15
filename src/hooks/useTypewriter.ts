import { useState, useEffect, useRef } from 'react';
import useSound from '@/hooks/useSound';

export const useTypewriter = (text: string, speed: number = 50, enabled: boolean, friendImageSrc?: string) => {
  const [displayedText, setDisplayedText] = useState('');
  const playTypeSound = useSound('/assets/murmur.mp3', 0.5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedTypingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const clearCurrentInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Stop any playing sound
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      hasStartedTypingRef.current = false;
    };

    if (enabled && text) {
      clearCurrentInterval();
      setDisplayedText('');
      
      // Play sound once when typing starts
      if (!hasStartedTypingRef.current) {
        const audio = document.createElement('audio');
        // Choose murmur sound based on friend's image
        if (friendImageSrc?.includes('friend-pixel-3.png')) {
          audio.src = '/assets/murmur-m.mp3';  // Male murmur for friend-pixel-3
        } else if (friendImageSrc?.includes('friend-pixel-2.png')) {
          audio.src = '/assets/murmur-f2.mp3'; // Special female murmur for friend-pixel-2
        } else {
          audio.src = '/assets/murmur-f.mp3';  // Default female murmur for others
        }
        audio.volume = 0.5;
        audio.play().catch(console.error);
        audioRef.current = audio;
        hasStartedTypingRef.current = true;
      }
      
      let i = 0;
      intervalRef.current = setInterval(() => {
        if (i < text.length) {
          const char = text.charAt(i);
          setDisplayedText((prev) => prev + char);
          i++;
        } else {
          // Stop sound when typing is complete
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
          }
          clearCurrentInterval();
        }
      }, speed);
    } else {
      clearCurrentInterval();
      setDisplayedText('');
    }

    // Cleanup function that runs when component unmounts or enabled becomes false
    return () => {
      clearCurrentInterval();
    };
  }, [text, speed, enabled, friendImageSrc]);

  return displayedText;
};
