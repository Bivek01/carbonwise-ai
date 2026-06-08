import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = false, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`glass-panel rounded-2xl p-6 ${hover ? 'hover:shadow-xl transition-shadow' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
