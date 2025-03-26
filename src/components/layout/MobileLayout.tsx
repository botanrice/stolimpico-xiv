import { motion } from 'framer-motion';
import { useState } from 'react';
import { allTracks } from '../../data/tracks';
import { TrackCarousel } from '../mobile/TrackCarousel';
import { useInventory } from '../../hooks/useInventory';
import { InventoryDrawer } from '../mobile/InventoryDrawer';
// import { Track } from '../../types';
// import { AudioPlayer } from '../common/AudioPlayer';

export const MobileLayout = () => {
  const { hasCollected, addToInventory, clearInventory } = useInventory();

  // const [hasListened, setHasListened] = useState(false);
  // const handleAudioComplete = () => {
  //   setHasListened(true);
  // };

  return (
    <div id="mobile-layout" className="flex flex-col justify-between items-center w-screen h-screen pt-6 bg-black text-white overflow-hidden">
      <TrackCarousel 
        tracks={allTracks} 
        onCollect={addToInventory}
        hasCollected={hasCollected}
      />
      <InventoryDrawer 
        inventory={allTracks}
        hasCollected={hasCollected}
        clearInventory={clearInventory}
      />
    </div>
  )
};