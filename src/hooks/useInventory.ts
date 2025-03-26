import { useState, useEffect } from 'react';
import { Track } from '../types';
import { allTracks } from '../data/tracks';

export interface CollectedItem {
  trackId: number;
  imagePath: string;
  dateCollected?: string;
}

/**
 * NOTE for LEARNING (3/26): I am using a hook here because I am working with
 * **external state** saved in localStorage. 
 * @returns 
 */
export const useInventory = () => {
  /** List of items that have been collected, saved in localStorage */
  const [collectedItems, setCollectedItems] = useState<CollectedItem[]>(() => {
    const saved = localStorage.getItem('stolimpico-inventory');
    return saved ? JSON.parse(saved) : [];
  });

  /** Updates localStorage whenever collectedItems changes */
  useEffect(() => {
    localStorage.setItem('stolimpico-inventory', JSON.stringify(collectedItems));
  }, [collectedItems]);

  /** Gets current inventory of collected items */
  const getInventory = () => collectedItems;

  /** Checks if a given track has been collected */
  const hasCollected = (trackId: number): boolean => {
    return collectedItems.some(item => item.trackId === trackId);
  };

  /** Adds a new track to the inventory via localStorage */
  const addToInventory = (track: Track) => {
    if (!hasCollected(track.id)) {
      setCollectedItems(prev => [...prev, {
        trackId: track.id,
        imagePath: track.coverArt,
        dateCollected: new Date().toISOString()
      }]);
    }
  };

  /** Ben Functions ***** */

  /** (needed???) Returns a list of all potential inventory */
  const getPotentialInventory = (): CollectedItem[] => {
    return allTracks.map(track => ({
      trackId: track.id,
      imagePath: track.collectibleImage
    }));
  }

  /** Clears the inventory */
  const clearInventory = () => {
    setCollectedItems([]);
  };

  return {
    addToInventory,
    hasCollected,
    getInventory,
    getPotentialInventory,
    clearInventory,
    collectedItems
  };
};