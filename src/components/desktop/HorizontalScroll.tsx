import { motion, useScroll, useAnimate, useTransform } from "framer-motion";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { tracks } from "../../data/tracks";
import { TrackDisplay } from "../common/TrackDisplay";


export const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackGroupRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  
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
  // const dragConstraints = {
  //   right: 0,
  //   left: -((tracks.length - 1) * window.innerWidth)
  // };

  useLayoutEffect(() => {
    const updateConstraints = () => {
      if (trackGroupRef.current && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const trackGroupWidth = trackGroupRef.current.scrollWidth;
        
        setDragConstraints({
          right: 0,
          left: -(trackGroupWidth - containerWidth)
        });
      }
    };

    updateConstraints();
    // Add resize listener to update constraints when window size changes
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      id="horizontal-scroll-container"
      className="h-full w-full flex overflow-x-auto scrollbar-hide"
      whileInView={{ x: [-100, 0] }}
      viewport={{ once: true }}
    >
      <motion.div 
        ref={trackGroupRef}
        id="track-group-wrapper"
        className="flex flex-nowrap gap-8 w-full"
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileDrag={{ cursor: "grabbing" }}
        style={{ 
          cursor: "grab",
          touchAction: "pan-x",  // Enables touch scrolling
          WebkitOverflowScrolling: "touch" // Smooth scrolling on iOS
        }}
      >
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
              toggleDrawer={() => {}}
              track={track}
              isMobile={false}
            />
          </motion.div>
        ))}
      </motion.div>

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