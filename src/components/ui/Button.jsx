import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', icon: Icon, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  
  const variants = {
    primary: "bg-forest-600 text-white hover:bg-forest-700 hover:shadow-lg focus-visible:ring-forest-500",
    secondary: "bg-mint text-forest-800 hover:bg-forest-100 hover:shadow focus-visible:ring-forest-300",
    outline: "border-2 border-forest-500 text-forest-600 hover:bg-forest-50 focus-visible:ring-forest-500",
    ghost: "text-slate-600 hover:text-forest-600 hover:bg-forest-50 focus-visible:ring-forest-500"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  const selectedSize = props.size ? sizes[props.size] : sizes.md;

  return (
    <motion.button
      whileTap={props.disabled ? {} : { scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${selectedSize} ${className} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-disabled={props.disabled}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" aria-hidden="true" />}
      {children}
    </motion.button>
  );
};

export default Button;
