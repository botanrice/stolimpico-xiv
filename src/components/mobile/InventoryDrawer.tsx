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
      className={`w-12 h-12 transition-all duration-300`}
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

  return (
    <div id="inventory-drawer" className="flex flex-col w-full p-4 border-t-4 border-[#454f5c] border-ridge" style={{ display: show ? 'flex' : 'none' }}>
      <div id="collectibles" className="flex w-full justify-between items-start gap-2 px-4">
        {inventory.map((track, index) => (
          <InventoryItem key={index} track={track} hasCollected={hasCollected} />
        ))}
      </div>
      {/* {process.env.NODE_ENV === 'development' && (
        <button onClick={clearInventory} className="text-white text-xs bg-slate-400">
          Clear Inventory
        </button>
      )} */}
    </div>
  );
};