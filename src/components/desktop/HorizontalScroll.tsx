import { motion, useScroll, useAnimate, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { tracks } from "../../data/tracks";
import { TrackDisplay } from "./TrackDisplay";


export const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollXProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress into opacity for fade effect
  // Note, I changed the final value in the output to 1 so it wouldn't disappear
  const opacity = useTransform(
    scrollXProgress,
    [0, 0.1, 0.9, 1],
    [1, 1, 1, 1]
  );

  // Calculate drag constraints based on number of tracks
  const dragConstraints = {
    right: 0,
    left: -((tracks.length - 1) * window.innerWidth)
  };

  return (
    <motion.div 
      ref={containerRef}
      id="horizontal-scroll"
      className="h-full w-full flex overflow-x-auto scrollbar-hide"
      whileInView={{ x: [-100, 0] }}
      viewport={{ once: true }}
      drag="x"
      dragConstraints={dragConstraints}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileDrag={{ cursor: "grabbing" }}
      style={{ 
        cursor: "grab",
        overflowX: "scroll", // Changed from overflow-x-auto in className
        touchAction: "pan-x",  // Enables touch scrolling
        WebkitOverflowScrolling: "touch" // Smooth scrolling on iOS
      }}
    >
      <div className="flex flex-nowrap gap-8">
        {tracks.map((track, index) => (
          <motion.div 
            key={track.id}
            id="track-group"
            className="w-[80%] flex-shrink-0"
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.2,
              type: "spring",
              stiffness: 100
            }}
            style={{ opacity }}
          >
            <TrackDisplay 
              track={track} 
              isActive={true}
              isMobile={false}
            />
          </motion.div>
        ))}
      </div>

      {/* Optional scroll progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Swipe or drag to explore...
        </motion.p>
      </div>
      <motion.div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
                  h-1 w-48 bg-gray-800 rounded-full"
      >
        <motion.div
          className="h-full bg-white rounded-full"
          style={{ scaleX: scrollXProgress }}
        />
      </motion.div>
    </motion.div>
  );
};