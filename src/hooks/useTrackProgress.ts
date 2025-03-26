import { useState, useEffect } from 'react';

interface TrackProgress {
  trackId: number;
  progress: number;
  lastPlayed: string;
}

export const useTrackProgress = (trackId: number) => {
  const [savedProgress, setSavedProgress] = useState<number>(0);
  
  useEffect(() => {
    const loadProgress = () => {
      const saved = localStorage.getItem('stolimpico-progress');
      if (saved) {
        const progressData: TrackProgress[] = JSON.parse(saved);
        const trackProgress = progressData.find(p => p.trackId === trackId);
        if (trackProgress) {
          setSavedProgress(trackProgress.progress);
        }
      }
    };

    loadProgress();
  }, [trackId]);

  const saveProgress = (progress: number) => {
    const saved = localStorage.getItem('stolimpico-progress');
    let progressData: TrackProgress[] = saved ? JSON.parse(saved) : [];
    
    const now = new Date().toISOString();
    
    const existingIndex = progressData.findIndex(p => p.trackId === trackId);
    if (existingIndex >= 0) {
      progressData[existingIndex] = { trackId, progress, lastPlayed: now };
    } else {
      progressData.push({ trackId, progress, lastPlayed: now });
    }

    localStorage.setItem('stolimpico-progress', JSON.stringify(progressData));
    setSavedProgress(progress);
  };

  return { savedProgress, saveProgress };
};