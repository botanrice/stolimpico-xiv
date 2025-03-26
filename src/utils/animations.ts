import { TargetAndTransition, Variant, Variants } from 'framer-motion';

// Animation presets
export const ANIMATION_PRESETS = {
  FADE_IN: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  
  SLIDE_UP: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.3 }
  },
  
  SCALE_IN: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { duration: 0.3 }
  }
} as const;

// Shared animation variants
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Animation utilities
export const animations = {
  /**
   * Create a stagger effect for child elements
   */
  stagger: (staggerChildren = 0.1, delayChildren = 0): TargetAndTransition => ({
    transition: {
      staggerChildren,
      delayChildren
    }
  }),

  /**
   * Create a hover animation preset
   */
  hover: (scale = 1.05): Variant => ({
    scale,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }),

  /**
   * Create a click/tap animation preset
   */
  tap: (scale = 0.95): Variant => ({
    scale,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }),

  /**
   * Create a floating animation
   */
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },

  /**
   * Create a pulse animation
   */
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },

  /**
   * Create a scroll progress animation
   */
  scrollProgress: (progress: number): TargetAndTransition => ({
    scaleX: progress,
    transition: {
      duration: 0.1,
      ease: "linear"
    }
  }),

  /**
   * Create an entrance animation for collection items
   */
  collectibleEntrance: (index: number): TargetAndTransition => ({
    opacity: [0, 1],
    scale: [0.8, 1],
    y: [20, 0],
    transition: {
      delay: index * 0.1,
      duration: 0.4,
      ease: "easeOut"
    }
  }),

  /**
   * Create a background gradient animation
   */
  gradientFlow: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Example usage in a component:
/*
import { motion } from 'framer-motion';
import { animations, ANIMATION_PRESETS } from '../utils/animations';

const MyComponent = () => {
  return (
    <motion.div
      {...ANIMATION_PRESETS.FADE_IN}
      whileHover={animations.hover()}
      whileTap={animations.tap()}
    >
      <motion.div animate={animations.float}>
        Floating content
      </motion.div>
    </motion.div>
  );
};
*/