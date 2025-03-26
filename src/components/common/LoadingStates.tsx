import { motion } from 'framer-motion';

export const ImageLoader = () => (
  <motion.div
    className="w-full h-full bg-gray-800 rounded-lg"
    animate={{
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
    }}
  />
);

export const AudioLoader = () => (
  <div className="w-full bg-gray-800 rounded-lg p-4">
    <motion.div
      className="w-full h-2 bg-gray-700 rounded-full"
      animate={{
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
  </div>
);