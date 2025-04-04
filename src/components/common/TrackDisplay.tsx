import { useState, useEffect, useRef, useCallback, MouseEvent } from 'react';
import { motion } from "framer-motion";
import { useAudioPlayer } from "react-use-audio-player";
import { Track } from '../../types';
import { TrackInfoLinks } from './TrackInfoLinks';
import { LinkIcon } from './LinkIcon';
import { formatTime } from '@/utils/timeFormat';

interface TrackDisplayProps {
  track: Track;
  isMobile: boolean;
  toggleDrawer: () => void;
}

interface YouTubeProps {
  videoId: string;
  title: string;
  className?: string;
}

const YouTube: React.FC<YouTubeProps> = ({ videoId, title, className }) => {
  return (
    <div id="youtube-round-embed-wrap" className={`relative aspect-square overflow-hidden rounded-full h-[280px] ${className}`}>
      <div id="youtube-round-embed" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
};


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

const TrackTimeTracker = ({ audioPosition, duration }: { audioPosition: number; duration: number }) => (
  <div className="flex items-center justify-between">
    <div id="track-time-tracking" className="text-sm text-gray-400">
      {formatTime(audioPosition)} / {formatTime(duration)}
    </div>
  </div>
)

export const TrackDisplay = ({ track, isMobile, toggleDrawer }: TrackDisplayProps) => {
  const { togglePlayPause, seek, getPosition, play, pause, isPlaying, duration } = useAudioPlayer(track.audioFile);
  const [audioPosition, setAudioPosition] = useState(0);
  const frameRef = useRef<number>()
  const seekbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      {/* Cover Art */}
      {track.id == 99 ? (
        <CoverArt src={track.coverArt} alt={`Artwork for ${track.title}`} />
      ) : (
        <motion.div id="cover-art-audio-player" className="w-full rounded-[999px] md:max-w-[500px] md:pr-8 mb-4 md:mb-0">
          <div className="relative w-full">
            {isMobile ? (
              <YouTube 
                videoId="A-OwYdNIfrw"
                title="YouTube video player"
                className="w-full rounded-full max-w-[400px] max-h-[280px] mx-auto shadow-lg"
              />
            ) : (
              <motion.img
                id="cover-art-img"
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
            )}
            {/* {isMobile && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  className="w-28 h-28 rounded-full bg-[#cbcbcbba] text-black flex items-center justify-center text-xl"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>
            )} */}
          </div>
          {/* Mobile Audio Progress Bar */}
          {/* {isMobile && (
            <>
            <div 
              id="new-track-progress-bar"
              className="flex-1 h-2 bg-gray-600 rounded-full cursor-pointer"
              ref={seekbarRef}
              onClick={goTo}
            >
              <motion.div 
                className="h-full bg-white rounded-full"
                style={{ width: `${(audioPosition / duration) * 100}%` }}
              />
            </div>
            <TrackTimeTracker audioPosition={audioPosition} duration={duration} />
            </>
          )} */}
        </motion.div>
      )}

      {/* Track Info */}
      <div id="track-info-wrap" className="w-full md:w-1/2 md:pl-8 md:flex md:flex-col md:gap-8">
        {!isMobile && track.id != 99 && (
          <div className="w-full">
            <motion.h2 
              className="text-3xl font-bold mb-1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {track.title}
            </motion.h2>
          </div>
        )}
        {!isMobile && track.id != 99 && (
          <div className="grid grid-cols-3 gap-4">
            <LinkIcon 
              src="assets/images/icons/youtube.png" 
              alt="youtube-link" 
              href="https://youtube.com"
              text="YouTube"
            />
            <LinkIcon 
              src="public/assets/images/icons/youtube.png" 
              alt="youtube-link" 
              href="https://youtube.com"
              text="YouTube"
            />
            <LinkIcon 
              src="assets/images/icons/youtube.png" 
              alt="youtube-link" 
              href="https://youtube.com"
              text="YouTube"
            />
          </div>
        )}
        {(track.id == 99) && (
          <TrackInfoLinks />
        )}
        <div className="w-full h-16 text-2xl text-center flex items-center justify-center font-bold">
          <h2>{track.title}</h2>
        </div>
        {/* BEN Audio Player */}
        {(!isMobile && track.id != 99) && (
          <div id="track-player" className="mt-4">
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

              <TrackTimeTracker audioPosition={audioPosition} duration={duration} />
            </div>
          </div>
        )} 

      </div>
    </motion.div>
  );
};