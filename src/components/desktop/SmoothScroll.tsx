import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react"
import ResizeObserver from "resize-observer-polyfill"
import {
  motion,
  useScroll,
  useTransform,
  useSpring
} from "framer-motion"
import { tracks } from "../../data/tracks";
import { TrackDisplay } from "../common/TrackDisplay";

export const SmoothScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(0)
  const [viewportW, setViewportW] = useState(0)

  useLayoutEffect(() => {
    if (scrollRef.current) {
      console.log("scrollWidth: ", scrollRef.current.scrollWidth)
      setScrollRange(scrollRef.current.scrollWidth)
    }
  }, [scrollRef])

  const onResize = useCallback((entries: any) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width)
    }
  }, [])

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(entries => onResize(entries))
    if (ghostRef.current) {
      resizeObserver.observe(ghostRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [onResize])

  useEffect(() => {
    console.log("spring");
  }, [viewportW]);

  const { scrollY, scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });
  console.log("scrollYProgress: ", scrollY);
  console.log("scrollRange: ", scrollRange);
  console.log("viewportW: ", viewportW);
  const transform = useTransform(
    scrollY,
    [0, 1],
    [0, -scrollRange + viewportW]
  );
  const physics = { damping: 15, mass: 0.27, stiffness: 55 }
  const spring = useSpring(transform, physics)
  console.log("spring: ", spring.get());

  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{ x: spring, y: 0 }}
        id="thumbnails-container"
        className="relative h-screen w-max flex items-center px-40 border-[40px] border border-yellow-green"
      >
        <div id="thumbnails" className="flex relative border border-yellow-200">
          <div className="h-40 bg-blue-400 w-[500px] border border-pink-200">
            <h2 className="text-3xl font-bold mb-4">test</h2>
          </div>
          <div className="h-40 bg-blue-400 w-[500px] border border-pink-200">
            <h2 className="text-3xl font-bold mb-4">test</h2>
          </div>
          <div className="h-40 bg-blue-400 w-[500px] border border-pink-200">
            <h2 className="text-3xl font-bold mb-4">test</h2>
          </div>
        {/* {tracks.map((track, index) => (
          <div className="flex flex-col md:flex-row items-center justify-center p-8">
            <img src={track.coverArt} className="w-1/2 rounded-lg shadow-2xl"></img>
            <h2 className="text-3xl font-bold mb-4">{track.title}</h2>
          </div>
        ))} */}
        </div>
      </motion.div>
      <div ref={ghostRef} style={{ height: scrollRange }} id="ghost" className="w-screen" />
    </>
  )
}

export default SmoothScroll
