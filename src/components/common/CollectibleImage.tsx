import { motion, AnimatePresence } from 'framer-motion';
import { Track } from '../../types';
import { useState } from 'react';

interface CollectibleImageProps {
  track: Track;
  onCollect: () => void;
}

export const CollectibleImage = ({ track, onCollect }: CollectibleImageProps) => {
  const [isCollecting, setIsCollecting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCollect = async () => {
    setIsCollecting(true);
    
    // Simulate collection animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onCollect();
    setIsCollecting(false);
    setShowConfirmation(true);
    
    // Hide confirmation after 2 seconds
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {!isCollecting && !showConfirmation && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex flex-col items-center"
          >
            <motion.img
              src={track.collectibleImage}
              alt={`Collectible for ${track.title}`}
              className="w-32 h-32 object-contain cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCollect}
            />
            <p className="mt-2 text-sm text-gray-300">
              Tap to collect
            </p>
          </motion.div>
        )}

        {isCollecting && (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ 
              scale: [1, 1.2, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={track.collectibleImage}
              alt={`Collecting ${track.title}`}
              className="w-32 h-32 object-contain"
            />
          </motion.div>
        )}

        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <p className="text-green-400">
              Collected! 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};