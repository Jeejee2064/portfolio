import React from 'react';
import { motion } from 'framer-motion';

const OverlappingScreenshots = () => {
  // Updated to use actual screenshot names
  const screenshots = [
    "/wk1.jpg", 
    "/wk2.jpg", 
    "/wk3.jpg"
  ];

  return (
    <div className="relative h-[800px] w-full flex justify-center items-center space-x-[-100px] hover:space-x-4 transition-all duration-300">
      {screenshots.map((src, index) => (
        <motion.div
          key={index}
          initial={{ 
            rotate: (index - 1) * 3, 
            scale: 0.9,
            y: index * 10,
            x: index * 100,
            opacity: 0 
          }}
          animate={{ 
            rotate: (index - 1) * 3, 
            scale: 1,
            y: index * 10,
            x: index * 100,
            opacity: 1 
          }}
          transition={{ 
            delay: index * 0.2,
            type: "spring",
            stiffness: 100
          }}
          className="absolute shadow-xl h-screen rounded-lg overflow-hidden  hover:z-10 hover:scale-105"
          style={{ 
   
            zIndex: screenshots.length - index 
          }}
        >
          <img 
            src={src} 
            alt={`Screenshot ${index + 1}`} 
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default OverlappingScreenshots;