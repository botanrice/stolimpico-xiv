import { useEffect, useState } from 'react';
import { Track } from '../types';

export const useAudioPreload = (tracks: Track[]) => {
  const [loadedTracks, setLoadedTracks] = useState<Set<number>>(new Set());
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    const preloadTrack = async (track: Track): Promise<number> => {
      return new Promise((resolve) => {
        const audio = new Audio();
        audio.src = track.audioFile;
        audio.preload = 'auto';
        
        audio.addEventListener('canplaythrough', () => {
          setLoadedTracks(prev => new Set([...prev, track.id]));
          resolve(track.id);
        });

        // Fallback if loading takes too long
        setTimeout(() => resolve(track.id), 5000);
      });
    };

    const preloadAllTracks = async () => {
      setIsPreloading(true);
      await Promise.all(tracks.map(track => preloadTrack(track)));
      setIsPreloading(false);
    };

    preloadAllTracks();
  }, [tracks]);

  return { loadedTracks, isPreloading };
};