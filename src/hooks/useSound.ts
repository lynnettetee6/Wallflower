
import { useCallback } from 'react';

const useSound = (soundUrl: string, volume: number = 1.0) => {
  const play = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const audio = new Audio(soundUrl);
      audio.volume = volume;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`Could not play sound "${soundUrl}". User interaction might be required.`, error);
        });
      }
    } catch (error) {
      console.error(`Error playing sound: ${soundUrl}`, error);
    }
  }, [soundUrl, volume]);

  return play;
};

export default useSound;
