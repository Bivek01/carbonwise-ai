import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';

const NavLinks = ({ mobile, closeMenu }) => {
  const location = useLocation();
  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Insights', path: '/insights' },
    { name: 'Challenges', path: '/challenges' },
    { name: 'Progress', path: '/progress' },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.path}
            to={link.path}
            onClick={closeMenu}
            className={`${
              mobile ? 'block py-3 text-lg' : 'px-4 py-2'
            } font-medium transition-colors ${
              isActive 
                ? 'text-forest-600 border-b-2 border-forest-500' 
                : 'text-slate-600 hover:text-forest-500'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav aria-label="Main Navigation" className="fixed w-full top-0 z-50 glass-panel border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" aria-label="CarbonWise AI Home" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-forest-400 to-leaf p-2 rounded-xl group-hover:shadow-lg transition-all" aria-hidden="true">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              Carbon<span className="text-forest-600">Wise</span> AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLinks />
            <div className="ml-4 pl-4 border-l border-slate-200">
              <Button variant="primary">Get Started</Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              className="text-slate-600 hover:text-forest-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 rounded-md p-1"
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/20"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              <NavLinks mobile closeMenu={() => setIsOpen(false)} />
              <div className="pt-4 mt-2 border-t border-slate-200">
                <Button variant="primary" className="w-full justify-center">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
