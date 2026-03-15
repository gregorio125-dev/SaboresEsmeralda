import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee, Gem, ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { NAV_LINKS } from '../../utils/constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isSolid = isScrolled || location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isSolid ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Coffee className={cn("w-8 h-8 transition-colors", isSolid ? "text-coffee-800" : "text-white")} />
            <Gem className="w-4 h-4 text-emerald-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span
            className={cn(
              "font-bold text-xl md:text-2xl tracking-tight transition-colors",
              isSolid ? "text-coffee-800" : "text-white"
            )}
          >
            Sabores Esmeralda
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "font-medium transition-colors hover:text-emerald-500",
                isSolid ? "text-gray-600" : "text-white/90"
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* 🔥 LOGIN */}
          <Link
            to="/login"
            className={cn(
              "font-medium transition-colors hover:text-emerald-500",
              isSolid ? "text-gray-600" : "text-white/90"
            )}
          >
            Iniciar Sesión
          </Link>

          {/* 🔥 REGISTER */}
          <Link
            to="/register"
            className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition"
          >
            Registro
          </Link>

          {/* 🔥 CARRITO */}
          <Link
            to="/carrito"
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-emerald-100",
              isSolid ? "text-gray-600 hover:text-emerald-600" : "text-white/90 hover:text-emerald-500"
            )}
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-current"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={cn("w-6 h-6", isSolid ? "text-coffee-800" : "text-white")} />
          ) : (
            <Menu className={cn("w-6 h-6", isSolid ? "text-coffee-800" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-lg font-medium text-gray-700 hover:text-emerald-500 py-2 border-b border-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* 🔥 LOGIN MOBILE */}
              <Link
                to="/login"
                className="text-lg font-medium text-gray-700 hover:text-emerald-500 py-2 border-b border-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>

              {/* 🔥 REGISTER MOBILE */}
              <Link
                to="/register"
                className="bg-emerald-600 text-white px-4 py-2 rounded-full text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Registro
              </Link>
              
              {/* 🔥 CARRITO MOBILE */}
              <Link
                to="/carrito"
                className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-emerald-500 py-2 border-b border-gray-50 mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                Carrito
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
