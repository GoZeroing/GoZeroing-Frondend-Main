"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
        transition={{
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1], // Elastic easing
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
