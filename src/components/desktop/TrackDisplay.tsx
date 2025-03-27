import { useState, useEffect, useRef, useCallback, MouseEvent } from 'react';
import { motion } from "framer-motion";
import { useAudioPlayer } from "react-use-audio-player";
import { Track } from '../../types';
// import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { useTrackProgress } from '../../hooks/useTrackProgress';

interface TrackDisplayProps {
  track: Track;
  isActive: boolean;
  isMobile: boolean;
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
  <a className="flex flex-col justify-center items-center" href="#">
    <img className="max-w-12 max-h-12" src="/assets/images/collectible_c2c.png" alt={alt} />
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
        <LinkIcon 
          src="/assets/images/collectible_c2c.png" 
          alt="spotify-icon" 
          href="https://soundcloud.com/stoicdapoet" 
          text="Soundcloud" 
        />
        <LinkIcon 
          src="/assets/images/collectible_c2c.png" 
          alt="spotify-icon" 
          href="https://open.spotify.com/artist/5IXHcQG5Sw0xYlRWuWEkL9" 
          text="Spotify" 
        />
        <LinkIcon 
          src="/assets/images/collectible_c2c.png" 
          alt="apple-icon" 
          href="https://music.apple.com/kz/artist/stoic-da-poet/1608739744" 
          text="Apple" 
        />
        <LinkIcon 
          src="/assets/images/collectible_c2c.png" 
          alt="link-icon" 
          href="https://stoicdapoet.bandcamp.com/track/svaoform" 
          text="Bandcamp"
        />
        <LinkIcon 
          src="/assets/images/collectible_c2c.png" 
          alt="link-icon" 
          href="https://www.youtube.com/watch?v=7OYfVrt1njY" 
          text="YouTube"
        />
        <LinkIcon 
          src="/assets/images/collectible_c2c.png" 
          alt="link-icon" 
          href="https://www.youtube.com/watch?v=7OYfVrt1njY" 
          text="YouTube"
        />
    </motion.div>
  </>
);

export const TrackDisplay = ({ track, isActive, isMobile }: TrackDisplayProps) => {
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

  const handleLeave = (entry: IntersectionObserverEntry | null) => {
    entry ? console.log(entry.intersectionRect) : console.log("leaving view for track");
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
      onViewportLeave={pause}
    >
      {/* Cover Art */}
      {/* <CoverArt src={track.coverArt} alt={`Artwork for ${track.title}`} /> */}

      {/* Experimental Cover Art + Audio Player Combo Element 
            - This element displays the cover art with a play button on top of it that controls
            the audio player. 
            - The cover art is completely rounded to the point of being nearly a circle.
            - There is a progress bar to indicate the audio play progress that follows 
            the outline of the circle. The progress bar completes the circle when the audio has finished.
      */}
      <div id="cover-art-audio-player" className="w-full md:max-w-[500px] md:pr-8 mb-4 md:mb-0">
        <div className="relative w-full">
          <motion.img
            src={track.coverArt}
            alt={`Artwork for ${track.title}`}
            className="w-full rounded-full shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl"
              onClick={handlePlayPause}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
          </div>
        </div>
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
        <div className="flex items-center justify-between">
          <div id="track-time-tracking" className="text-sm text-gray-400">
            {formatTime(audioPosition)} / {formatTime(duration)}
          </div>
        </div>
      </div>


      {/* <div id="cover-art-wrap" className="w-full md:max-w-[500px] md:pr-8 mb-4 md:mb-0">
        <motion.img
          src={track.coverArt} alt={`Artwork for ${track.title}`}
          className="w-full rounded-lg shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
      </div> */}

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
          {(track.id == 99) && (
            <TrackInfo data={["hi", "there"]} />
          )}
        </div>

        {/* BEN Audio Player */}
        {/* {track.id != 99 && (
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
        )} */}

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