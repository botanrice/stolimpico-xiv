import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Track } from '../../types';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { useTrackProgress } from '../../hooks/useTrackProgress';
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch"
import { Collect } from '../ui/collect';
import { InventoryDrawer } from '../mobile/InventoryDrawer';
import { useInventory } from '../../hooks/useInventory';


interface TrackDisplayProps {
  track: Track;
  isActive: boolean;
  isMobile: boolean;
}

export const TrackDisplay = ({ track, isActive, isMobile }: TrackDisplayProps) => {
  const { audioRef, audioState, togglePlay, seek } = useAudioPlayer(track.audioFile);
  const { savedProgress, saveProgress } = useTrackProgress(track.id);

  useEffect(() => {
    if (savedProgress > 0 && audioRef.current) {
      audioRef.current.currentTime = savedProgress;
    }
  }, [savedProgress]);

  useEffect(() => {
    if (audioState.currentTime > 0) {
      saveProgress(audioState.currentTime);
    }
  }, [audioState.currentTime]);

  return (
    <motion.div 
      id="track-display"
      className="md:h-full flex flex-col md:flex-row items-center justify-start md:justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cover Art */}
      <div id="cover-art-wrap" className="w-full md:max-w-[500px] md:pr-8 mb-4 md:mb-0">
        <motion.img
          src={track.coverArt}
          alt={`Artwork for ${track.title}`}
          className="w-full rounded-lg shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Track Info */}
      <div id="track-info-wrap" className="w-full md:w-1/2 md:pl-8">
        <div id="track-info" className="text-center md:text-left">
          <motion.h2 
            className="text-3xl font-bold mb-1"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {track.title}
          </motion.h2>
          {!isMobile || (track.id == 99) && (
            <>
              <motion.p 
                className="text-sm italic mb-1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                leverson, stoic da poet
              </motion.p>
              <motion.p 
                className="text-sm text-slate-200 italic underline mb-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <a href="#">link</a>
              </motion.p>
            </>
          )}
        </div>

        {/* Audio Player */}
        {track.id != 99 && (
          <div id="track-player" className="mt-4">
            <audio ref={audioRef} src={track.audioFile} />
            
            <div className="flex gap-4 justify-between items-center bg-gray-800 rounded-lg p-4">
              <div id="track-play-button" className="flex items-center justify-between">
                <button
                  className="w-12 h-12 rounded-full bg-white text-black 
                            flex items-center justify-center text-xl"
                  onClick={togglePlay}
                >
                  {audioState.isPlaying ? '⏸' : '▶'}
                </button>
              </div>
              <div 
                id="track-progress-bar"
                className="flex-1 h-2 bg-gray-600 rounded-full cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = (x / rect.width) * 100;
                  seek((percentage / 100) * audioState.duration);
                }}
              >
                <motion.div 
                  className="h-full bg-white rounded-full"
                  style={{ width: `${audioState.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div id="track-time-tracking" className="text-sm text-gray-400">
                  {formatTime(audioState.currentTime)} / {formatTime(audioState.duration)}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
};

// Helper function to format time in MM:SS
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};