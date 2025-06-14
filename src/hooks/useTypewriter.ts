
import { useState, useEffect, useRef } from 'react';
import useSound from '@/hooks/useSound';

export const useTypewriter = (text: string, speed: number = 50, enabled: boolean) => {
  const [displayedText, setDisplayedText] = useState('');
  // Note: you will need to add this sound file to your project
  const playTypeSound = useSound('/assets/typing-sound.mp3', 0.5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const clearCurrentInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (enabled && text) {
      clearCurrentInterval();
      setDisplayedText('');
      
      let i = 0;
      intervalRef.current = setInterval(() => {
        if (i < text.length) {
          const char = text.charAt(i);
          setDisplayedText((prev) => prev + char);
          if (char !== ' ') { // Don't play sound for spaces
             playTypeSound();
          }
          i++;
        } else {
          clearCurrentInterval();
        }
      }, speed);
    } else {
      clearCurrentInterval();
      setDisplayedText('');
    }

    return () => clearCurrentInterval();
  }, [text, speed, enabled, playTypeSound]);

  return displayedText;
};
