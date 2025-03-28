import { useState, useEffect, useRef, useCallback, MouseEvent } from 'react';
import { motion } from "framer-motion";
import { useAudioPlayer } from "react-use-audio-player";
import { Track } from '../../types';
import { IconLinks } from '../../data/iconlinks';
// import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { useTrackProgress } from '../../hooks/useTrackProgress';

interface TrackDisplayProps {
  track: Track;
  isActive: boolean;
  isMobile: boolean;
  toggleDrawer: () => void;
}

const CoverArt = ({ src, alt }: { src: string; alt: string }) => (
  <>
    <div id="cover-art-wrap" className="w-full md:max-w-[500px] md:pr-8 mb-4 md:mb-0">
      <motion.img
        src={src}
        alt={`Artwork for ${alt}`}
        className="w-full rounded-lg shadow-2xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  </>
)

const LinkIcon = ({ src, alt, href, text }: { src: string; alt: string; href: string, text: string }) => (
  <a className="flex flex-col justify-center items-center" href={href} target="_blank" rel="noopener noreferrer">
    <img className="max-w-12 max-h-12" src={src} alt={alt} />
    <span className="text-xs text-slate-200 italic underline">{text}</span>
  </a>
)

const TrackInfo = ({ data }: { data: string[] }) => (
  <>
    <motion.p 
      className="text-sm italic mb-1"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      leverson, stoic da poet
    </motion.p>
    <motion.div
      id="link-icon-container" 
      className="w-full grid grid-cols-3 gap-y-2 pt-4 pb-0"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {IconLinks.map((link) => (
        <LinkIcon 
          key={link.id}
          src={link.icon} 
          alt={link.name} 
          href={link.url} 
          text={link.name.charAt(0).toUpperCase() + link.name.slice(1)} />
      ))}
    </motion.div>
  </>
);

export const TrackDisplay = ({ track, isActive, isMobile, toggleDrawer }: TrackDisplayProps) => {
  const { togglePlayPause, seek, getPosition, play, pause, isPlaying, duration, error } = useAudioPlayer(track.audioFile);
  const [audioPosition, setAudioPosition] = useState(0);
  const frameRef = useRef<number>()
  const seekbarRef = useRef<HTMLDivElement>(null);
  // const { savedProgress, saveProgress } = useTrackProgress(track.id);

  // useEffect(() => {
  //   if (savedProgress > 0 && audioRef.current) {
  //     audioRef.current.currentTime = savedProgress;
  //   }
  // }, [savedProgress]);

  // useEffect(() => {
  //   if (audioState.currentTime > 0) {
  //     saveProgress(audioState.currentTime);
  //   }
  // }, [audioState.currentTime]);

  useEffect(() => {
    // if (getPosition() > 0) {
    //   setAudioPosition(getPosition());
    // }
    const animate = () => {
      setAudioPosition(getPosition())
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = window.requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
          cancelAnimationFrame(frameRef.current)
      }
    }
  }, [getPosition])

  const handlePlayPause = (event: MouseEvent) => {
    event.preventDefault()
    togglePlayPause();
  }

  // Code borrowed from react-use-audio-player repo (AudioSeekBar.tsx)
  const goTo = useCallback(
    (event: MouseEvent) => {
      const { pageX: eventOffsetX } = event

      if (seekbarRef.current) { 
          const elementOffsetX = event.currentTarget.getBoundingClientRect() // modified borrowed code to use bounding rect
          const elementWidth = seekbarRef.current.clientWidth
          const percent = (eventOffsetX - elementOffsetX.left) / elementWidth
          seek(percent * duration)
          setAudioPosition(percent * duration)
          isPlaying ? play() : pause()  // Handling bug where button stops working after seeking
      }
  },
  [duration, isPlaying, seek]
  )

  const handleEnter = () => {
    track.id == 99 ? toggleDrawer() : null;
  }

  const handleLeave = () => {
    track.id == 99 ? toggleDrawer() : null;
    pause(); // pause track on leaving
  }
  // if (duration === Infinity) console.log("oh no duration is infinity");

  return (
    <motion.div 
      id="track-display"
      className="md:h-full flex flex-col md:flex-row items-center justify-start md:justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onViewportEnter={handleEnter}
      onViewportLeave={handleLeave}
    >
      {/* Show track title on top only on mobile */}
      {/* <div id="track-info" className="text-center md:text-left pb-4">
        {isMobile && (
          <motion.h2 
          className="text-3xl font-bold mb-1"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {track.title}
        </motion.h2>
        )}
      </div> */}
      
      {/* Cover Art */}
      {track.id == 99 ? (
        <CoverArt src={track.coverArt} alt={`Artwork for ${track.title}`} />
      ) : (
        <motion.div id="cover-art-audio-player" 
          className="w-full md:max-w-[500px] md:pr-8 mb-4 md:mb-0"
        >
          <div className="relative w-full">
            <motion.img
              src={track.coverArt}
              alt={`Artwork for ${track.title}`}
              className="w-full rounded-full md:rounded-none shadow-2xl"
              initial={{ rotate: 0 }}
              whileInView={{ 
                rotate: (isMobile ? 360 : 0),
                transition: isMobile ? { duration: 200, repeat: Infinity, ease: [.17,.67,.83,.67] } : {}
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            {isMobile && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  className="w-28 h-28 rounded-full bg-[#cbcbcbba] text-black flex items-center justify-center text-xl"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>
            )}
          </div>
          {/* Mobile Audio Progress Bar */}
          {isMobile && (
            <>
            <div 
              id="new-track-progress-bar"
              className="flex-1 h-2 bg-gray-600 rounded-full cursor-pointer"
              // className="block absolute w-[288px] h-[288px] overflow-hidden rounded-[125px] bg-gray-600 cursor-pointer"
              ref={seekbarRef}
              onClick={goTo}
            >
              <motion.div 
                className="h-full bg-white rounded-full"
                style={{ width: `${(audioPosition / duration) * 100}%` }}
              />
            </div>
            {/* <div className="flex items-center justify-between">
              <div id="track-time-tracking" className="text-sm text-gray-400">
                {formatTime(audioPosition)} / {formatTime(duration)}
              </div>
            </div> */}
            </>
          )}
        </motion.div>
      )}

      {/* Track Info */}
      <div id="track-info-wrap" className="w-full md:w-1/2 md:pl-8">
        <div id="track-info" className="text-center md:text-left">
          {!isMobile && track.id != 99 && (
            <motion.h2 
            className="text-3xl font-bold mb-1"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {track.title}
          </motion.h2>
          )}
          {(track.id == 99) && (
            <TrackInfo data={[]} />
          )}
        </div>

        {/* BEN Audio Player */}
        {(!isMobile && track.id != 99) && (
          <div id="track-player" className="mt-4">
            {/* <audio ref={audioRef} src={track.audioFile} /> */}
            
            <div className="flex gap-4 justify-between items-center bg-gray-800 rounded-lg p-4">
              <div id="track-play-button" className="flex items-center justify-between">
                <button
                  className="w-12 h-12 rounded-full bg-white text-black 
                            flex items-center justify-center text-xl"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>
              <div 
                id="track-progress-bar"
                className="flex-1 h-2 bg-gray-600 rounded-full cursor-pointer"
                onClick={goTo}
                ref={seekbarRef}
              >
                <motion.div 
                  className="h-full bg-white rounded-full"
                  style={{ width: `${(audioPosition / duration) * 100}%`  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div id="track-time-tracking" className="text-sm text-gray-400">
                  {formatTime(audioPosition)} / {formatTime(duration)}
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