import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = React.memo(({ children, className = '', delay = 0, hover = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={hover ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
      className={`relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-2xl ${className}`}
    >
      {/* Subtle top inner glow for premium glass feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none rounded-2xl" />
      {/* Content wrapper */}
      <div className="relative z-10 h-full p-6">
        {children}
      </div>
    </motion.div>
  );
});

GlassCard.displayName = 'GlassCard';
export default GlassCard;
