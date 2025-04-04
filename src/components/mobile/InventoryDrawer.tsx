import { motion } from 'framer-motion';
import { Track } from '../../types';

interface InventoryDrawerProps {
  show: boolean;
  inventory: Track[];
  hasCollected: (trackId: number) => boolean;
  clearInventory: () => void;
}

export const InventoryItem = ({ track, hasCollected }: { track: Track; hasCollected: (trackId: number) => boolean }) => {
  return (
    <div 
      className={`w-12 h-12 transition-all duration-300 ${
        hasCollected(track.id) 
            ? 'bg-slate-400' 
            : ''
        }`}
    >
      <img 
        className={`w-full h-full rounded-full ${
          hasCollected(track.id) 
            ? 'brightness-100' 
            : 'brightness-[30%]'
        }`}
        src={track.collectibleImage} 
        alt="Collectible"  
      />
    </div>
  );
}

export const InventoryDrawer = ({ show, inventory, hasCollected, clearInventory }: InventoryDrawerProps) => {
  // temp solution to hide the first inventory item, which was intended for the full project
  const inventoryMinusFirst = inventory.slice(1);

  return (
    <motion.div id="inventory-drawer" 
      className="flex flex-col w-full p-4 border-t-4 border-[#454f5c] border-ridge" 
      style={{ display: show ? 'flex' : 'none' }}
      initial={{ opacity: 0, y: show ? 100 : 0 }}
      animate={{ opacity: 1, y: show ? 0 : 100 }}
      
      transition={{ duration: 0.3 }}
    >
      <p className="absolute bottom-[80px] text-center text-xs text-gray-100 italic">collect all items to unlock</p>
      <div id="collectibles" className="flex w-full justify-between items-start gap-2 px-4">
        {inventoryMinusFirst.map((track, index) => (
          <InventoryItem key={index} track={track} hasCollected={hasCollected} />
        ))}
      </div>
      {process.env.NODE_ENV === 'development' && (
        <button onClick={clearInventory} className="text-white text-xs bg-slate-400">
          Clear Inventory
        </button>
      )}
    </motion.div>
  );
};