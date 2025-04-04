import { motion } from 'framer-motion';
import { useState } from 'react';
import { allTracks } from '../../data/tracks';
import { TrackCarousel } from '../mobile/TrackCarousel';
import { useInventory } from '../../hooks/useInventory';
import { InventoryDrawer } from '../mobile/InventoryDrawer';
import '../../styles/components.css';
// import { Track } from '../../types';
// import { AudioPlayer } from '../common/AudioPlayer';

export const MobileLayout = () => {
  const { hasCollected, addToInventory, clearInventory } = useInventory();
  const [showingAlbumMobile, setShowingAlbumMobile] = useState(true);

  // const [hasListened, setHasListened] = useState(false);
  // const handleAudioComplete = () => {
  //   setHasListened(true);
  // };

  return (
    <div id="mobile-layout" className="GradientBkg flex flex-col justify-between items-center w-screen h-screen bg-black text-white overflow-hidden">
      {/* <motion.div 
        className="text-white text-xs italic mb-2"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 5, delay: 2 }}
      >
        <p className="m-0">swipe to explore</p>
      </motion.div> */}
      <TrackCarousel 
        tracks={allTracks} 
        onCollect={addToInventory}
        hasCollected={hasCollected}
        toggleDrawer={() => setShowingAlbumMobile(!showingAlbumMobile)}
      />
      <InventoryDrawer 
        show={showingAlbumMobile}
        inventory={allTracks}
        hasCollected={hasCollected}
        clearInventory={clearInventory}
      />
    </div>
  )
};