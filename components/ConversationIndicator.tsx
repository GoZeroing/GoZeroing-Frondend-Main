'use client';

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface ConversationIndicatorProps {
  isActive: boolean;
  messageCount: number;
}

export const ConversationIndicator: React.FC<ConversationIndicatorProps> = ({ 
  isActive, 
  messageCount 
}) => {
  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-24 left-[88px] z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-r from-[#6a9ea4]/20 to-purple-500/20 backdrop-blur-md border border-[#6a9ea4]/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
          <MessageCircle className="w-4 h-4 text-[#6a9ea4]" />
          <span className="text-white text-sm font-medium">
            {messageCount} {messageCount === 1 ? 'message' : 'messages'}
          </span>
          <motion.div
            className="w-2 h-2 bg-[#6a9ea4] rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
