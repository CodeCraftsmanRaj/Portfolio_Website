import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OsMode } from '../data/portfolioData';

interface PageTransitionProps {
  mode: OsMode;
  viewKey: string;
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ mode, viewKey, children }) => {
  // OS-specific motion variants
  const variants = {
    LINUX: {
      initial: { opacity: 0, scale: 0.94, filter: 'blur(2px)' },
      animate: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.24, ease: [0.0, 0.0, 0.2, 1] as const },
      },
      exit: {
        opacity: 0,
        scale: 0.94,
        filter: 'blur(1px)',
        transition: { duration: 0.18, ease: [0.4, 0.0, 1, 1] as const },
      },
    },
    WIN: {
      initial: { opacity: 0, y: 28, scale: 0.99 },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.28, ease: [0.1, 0.9, 0.2, 1] as const },
      },
      exit: {
        opacity: 0,
        y: -12,
        scale: 0.99,
        transition: { duration: 0.16, ease: [0.7, 0.0, 1, 0.5] as const },
      },
    },
    MAC: {
      initial: { opacity: 0, scale: 0.88, y: 16 },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring' as const, stiffness: 280, damping: 24, mass: 0.9 },
      },
      exit: {
        opacity: 0,
        scale: 0.85,
        y: 12,
        transition: { duration: 0.2, ease: [0.32, 0, 0.67, 0] as const },
      },
    },
    ANDROID: {
      initial: { opacity: 0, y: 16, scale: 0.97 },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.26, ease: [0.2, 0, 0, 1] as const },
      },
      exit: {
        opacity: 0,
        y: -10,
        scale: 0.98,
        transition: { duration: 0.18, ease: [0.3, 0, 1, 1] as const },
      },
    },
    IOS: {
      initial: { opacity: 0, x: 20, scale: 0.98 },
      animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { type: 'spring' as const, stiffness: 320, damping: 30 },
      },
      exit: {
        opacity: 0,
        x: -16,
        scale: 0.98,
        transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] as const },
      },
    },
  };

  const currentVariant = variants[mode] || variants.LINUX;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewKey}
        initial={currentVariant.initial}
        animate={currentVariant.animate}
        exit={currentVariant.exit}
        style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, willChange: 'opacity, transform' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
