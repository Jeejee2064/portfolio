"use client"
import { motion } from 'framer-motion';
import { useState } from 'react';
import BGSVGShadow from './BGSVGShadow';
import localFont from 'next/font/local';

const mind = localFont({
  src: '../MINDCONTROL.ttf', // Adjust the path accordingly

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
      <div className="flex flex-col items-center justify-center flex h-screen w-screen bg-indigo-950 overflow-hidden">
        {/* Pass the completion handler to BGSVGShadow */}
        <BGSVGShadow onAnimationComplete={handleBgAnimationComplete} />

        {/* Text content that appears after background animation */}
        <div className="text-center px-6 z-[200] w-screen">
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate={bgAnimationComplete ? "visible" : "hidden"}
            className="text-white z-100 text-5xl md:text-6xl font-extrabold mb-4"
          >
            Hi! I'm Jérôme
          </motion.h1>

          <motion.p
            variants={textVariants}
            initial="hidden"
            animate={bgAnimationComplete ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="text-white text-xl z-100 md:text-2xl font-light"
          >
            I design, develop, and publish digital products
          </motion.p>
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate={bgAnimationComplete ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="text-white z-100 mt-12 text-sm font-light"
          >
            this background has been (pseudo) randomly generated, refresh
          </motion.p>
        </div>

        {/* Ticker container */}
        <motion.div
          className="absolute bottom-8 w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: bgAnimationComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
              delay: 0.4
            }}
            className="flex whitespace-nowrap"
          >
          <div className={mind.className}>
            <span className="text-4xl text-gray-300 font-bold bg-gradient-to-r from-[#FA5D66] via-[#FFA1C5] via-[#ffdb40] to-[#FA5D66] bg-clip-text text-transparent">{duplicatedText}</span>
           </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}