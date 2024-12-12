"use client"
import { motion } from 'framer-motion';
import { useState } from 'react';
import BGSVGShadow from './BGSVGShadow';
import localFont from 'next/font/local';

const neon = localFont({
  src: '../Neon.ttf', // Adjust the path accordingly

})
export default function Hero() {
  const [bgAnimationComplete, setBgAnimationComplete] = useState(false);
  const tickerText = "WEBSITE - MOBILE APP - DESIGN - MOTION - GRAPHICS - ";
  const duplicatedText = `${tickerText} ${tickerText} ${tickerText} ${tickerText}`;



  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleBgAnimationComplete = () => {
    setBgAnimationComplete(true);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-indigo-950 overflow-hidden">
        {/* Pass the completion handler to BGSVGShadow */}
        <BGSVGShadow onAnimationComplete={handleBgAnimationComplete} />

        {/* Text content that appears after background animation */}
        <div className="text-center  px-6 z-[200] w-screen">
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate={bgAnimationComplete ? "visible" : "hidden"}
            className="text-white z-100 text-3xl z-100 md:text-4xl  mb-4"
          >
           Hi! I&apos;m Jérôme
          </motion.p>

          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate={bgAnimationComplete ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="text-white text-4xl md:text-5xl font-bold"
          >
            I design, develop, and publish digital products
          </motion.h1>

      <motion.button 
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
      }}
      initial="hidden"
      animate={bgAnimationComplete ? "visible" : "hidden"}
      transition={{ delay: 0.1 }}
      whileHover={{
        backgroundImage: `linear-gradient(to right, 
          #FFA1C5, 
          #ffdb40, 
          #FA5D66
        )`,
        transition: { 
          duration: 0.5,
          ease: "easeInOut"
        },
        scale: 1.02
      }}
      className='my-8 px-2 py-4 shadow-lg text-gray-950 rounded-xl z-300 bg-gradient-to-r from-[#FA5D66] via-[#FFA1C5] to-[#ffdb40]'
    >
      Let's create something great together !
    </motion.button>
        </div>

   
 


    
      </div>
    </div>
  );
}