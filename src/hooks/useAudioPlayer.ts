import { useState, useRef, useEffect } from 'react';

interface AudioState {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  progress: number;
}

export const useAudioPlayer = (audioUrl: string) => {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    progress: 0,
  });
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setAudioState(prev => ({
        ...prev,
        duration: audio.duration,
      }));
    };

    const setTimeUpdate = () => {
      setAudioState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        progress: (audio.currentTime / audio.duration) * 100,
      }));
    };

    // Event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setTimeUpdate);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setTimeUpdate);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioState.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setAudioState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
    }
  };

  return {
    audioRef,
    audioState,
    togglePlay,
    seek,
  };
};