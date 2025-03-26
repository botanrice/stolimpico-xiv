import { useMediaQuery } from './hooks/useMediaQuery';
import { useAudioPreload } from './hooks/useAudioPreload';
import { tracks } from './data/tracks';
import { MobileLayout } from './components/layout/MobileLayout';
import { DesktopLayout } from './components/layout/DesktopLayout';
import { LayoutTransition } from './components/layout/LayoutTransition';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isPreloading, loadedTracks } = useAudioPreload(tracks);

  if (isPreloading) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <motion.div
          className="text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-2xl mb-4">STOLIMPICO XIV</h1>
          <div className="flex flex-col items-center">
            <motion.div
              className="w-32 h-1 bg-white rounded-full mb-2"
              animate={{
                width: `${(loadedTracks.size / tracks.length) * 128}px`
              }}
            />
            <p className="text-sm text-gray-400">
              Loading {Math.round((loadedTracks.size / tracks.length) * 100)}%
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <LayoutTransition isMobile={isMobile}>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </LayoutTransition>
  );
}

export default App;