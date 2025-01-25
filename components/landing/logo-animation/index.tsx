import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const logos = [
  {
    id: 1,
    src: '/icons/vtex-logo.svg',
    alt: 'VTEX',
    color: '#ff3366' // VTEX pink
  },
  {
    id: 2,
    src: '/icons/shopify-logo.svg',
    alt: 'Shopify',
    color: '#96bf48' // Shopify green
  },
//   {
//     id: 3,
//     src: '/path/to/commercetools-logo.svg',
//     alt: 'Commercetools',
//     color: '#0b556a' // Commercetools blue
//   }
];

export function LogoCarousel({logos}:{logos?:any}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length);
    }, 3000); // Change logo every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">



      {/* Animated center logo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 0.8}}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div 
            className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center p-4"
            style={{ 
              boxShadow: `0 0 20px ${logos[currentIndex].color}30`,
              border: `2px solid ${logos[currentIndex].color}20`
            }}
          >
            <img
              src={logos[currentIndex].src}
              alt={logos[currentIndex].alt}
              className="w-full h-full object-fit"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Static surrounding logos */}
     
    </div>
  );
}