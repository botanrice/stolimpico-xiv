import { motion } from 'framer-motion';
import { useState } from 'react';
import { tracks, albumArt } from '../../data/tracks';
import { HorizontalScroll } from '../desktop/HorizontalScroll';
import { TrackInfoLinks } from "../common/TrackInfoLinks";
import '../../styles/components.css';

export const DesktopLayout = () => {
  const [showingAlbum, setShowingAlbum] = useState(true);

  return (
    <div id="desktop-layout" className="GradientBkg w-screen h-screen text-white overflow-hidden">
      {showingAlbum ? (
        <motion.div 
          className="h-full flex items-center justify-center p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex-1 max-w-[500px]">
            <motion.img
              src={albumArt}
              alt="STOLIMPICO XIV Album Art"
              className="w-full rounded-lg shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          
          <div className="flex-1 flex flex-col gap-4 justify-start items-start w-1/2 pl-8">
            <motion.h1 
              className="text-4xl font-bold"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              STOLIMPICO XIV
            </motion.h1>

            <TrackInfoLinks />
            
            <motion.button
              className="px-6 py-3 bg-white text-black rounded-full 
                         font-semibold hover:bg-gray-200 transition-colors mt-12"
              onClick={() => setShowingAlbum(false)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Explore Tracks
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          id="scroll-wrapper"
          className="h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute top-4 left-4 z-10 px-4 py-2 
                       bg-white text-black rounded-full font-semibold 
                       hover:bg-gray-200 transition-colors"
            onClick={() => setShowingAlbum(true)}
          >
            Back to Album
          </button>
          <HorizontalScroll />
        </motion.div>
      )}
    </div>
  );
};