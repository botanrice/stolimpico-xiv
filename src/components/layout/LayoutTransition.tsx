import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface LayoutTransitionProps {
  children: ReactNode;
  isMobile: boolean;
}

export const LayoutTransition = ({ children, isMobile }: LayoutTransitionProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        id="layout-transition"
        key={isMobile ? 'mobile' : 'desktop'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};