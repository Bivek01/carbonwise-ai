import React from 'react';
import { motion } from 'framer-motion';

const Card = React.memo(({ children, className = '', hover = false, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -5, scale: 1.01, transition: { duration: 0.2 } } : {}}
      className={`glass-panel rounded-2xl p-6 border border-white/40 shadow-lg ${hover ? 'hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-white/60 transition-all duration-300' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';
export default Card;
