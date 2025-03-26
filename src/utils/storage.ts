// Storage keys
const STORAGE_KEYS = {
  INVENTORY: 'stolimpico-inventory',
  PROGRESS: 'stolimpico-progress',
  LAST_VISIT: 'stolimpico-last-visit',
  USER_PREFERENCES: 'stolimpico-preferences'
} as const;

// Types
interface StorageItem {
  value: any;
  timestamp: string;
  expiry?: string; // ISO date string
}

interface UserPreferences {
  autoplay: boolean;
  volume: number;
  theme: 'light' | 'dark';
}

// Storage utility functions
export const storage = {
  /**
   * Set an item in localStorage with timestamp and optional expiry
   */
  set: (key: string, value: any, expiryDays?: number) => {
    const item: StorageItem = {
      value,
      timestamp: new Date().toISOString(),
      ...(expiryDays && {
        expiry: new Date(Date.now() + expiryDays * 86400000).toISOString()
      })
    };
    
    try {
      localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },

  /**
   * Get an item from localStorage, checking expiry
   */
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const parsedItem: StorageItem = JSON.parse(item);
      
      // Check if item has expired
      if (parsedItem.expiry && new Date(parsedItem.expiry) < new Date()) {
        localStorage.removeItem(key);
        return null;
      }

      return parsedItem.value as T;
    } catch {
      return null;
    }
  },

  /**
   * Remove an item from localStorage
   */
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  /**
   * Clear all STOLIMPICO related items from localStorage
   */
  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },

  /**
   * Get all stored items with their timestamps
   */
  getStorageStatus: () => {
    const status: Record<string, { value: any; age: string }> = {};
    
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = storage.get(key);
      if (item) {
        const timestamp = JSON.parse(localStorage.getItem(key) || '{}').timestamp;
        status[key] = {
          value: item,
          age: new Date(timestamp).toISOString()
        };
      }
    });

    return status;
  },

  // Specific storage methods for STOLIMPICO XIV
  preferences: {
    get: (): UserPreferences => {
      return storage.get<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES) || {
        autoplay: false,
        volume: 0.8,
        theme: 'dark'
      };
    },
    
    set: (prefs: Partial<UserPreferences>): void => {
      const currentPrefs = storage.preferences.get();
      storage.set(STORAGE_KEYS.USER_PREFERENCES, {
        ...currentPrefs,
        ...prefs
      });
    }
  },

  // Record user's last visit
  updateLastVisit: (): void => {
    storage.set(STORAGE_KEYS.LAST_VISIT, new Date().toISOString());
  }
};