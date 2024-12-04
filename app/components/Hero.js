"use client"
import { motion } from 'framer-motion';
import { useState } from 'react';
import BGSVGShadow from './BGSVGShadow';
import localFont from 'next/font/local';
import Lottie from 'react-lottie';
import Motionicon from '../lottie/Motionicon.json'; 

const neon = localFont({
  src: '../Neon.ttf', // Adjust the path accordingly
})

export default function Hero() {
  const [bgAnimationComplete, setBgAnimationComplete] = useState(false);
  const [lottieState] = useState({
    isStopped: false,
    isPaused: false
  });

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: Motionicon,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleBgAnimationComplete = () => {
    setBgAnimationComplete(true);
  };

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

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-indigo-950 overflow-hidden">
        <BGSVGShadow onAnimationComplete={handleBgAnimationComplete} />
        
        <div className="text-center px-6 z-[200] w-screen">
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate={bgAnimationComplete ? "visible" : "hidden"}
            className="text-white z-100 text-xl md:text-2xl mb-4"
          >
            Hi! I&apos;m Jérôme
          </motion.p>
          
          <div className="mb-[-13%] w-1/2 mx-auto" style={{ clipPath: 'inset(0 0 30% 0)' }}>
            <Lottie
              options={defaultOptions}
              height={300}
              width="100%"
              isStopped={lottieState.isStopped}
              isPaused={lottieState.isPaused}
            />
          </div>
          
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate={bgAnimationComplete ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="text-white text-4xl md:text-5xl font-bold"
          >
            I design, develop, and publish digital products
          </motion.h1>
          
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate={bgAnimationComplete ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="text-white z-100 mt-12 text-sm font-light"
          >
            this background has been (pseudo) randomly generated, refresh
          </motion.p>
          
          <motion.button 
            variants={textVariants}
            initial="hidden"
            animate={bgAnimationComplete ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className='my-8 px-4 py-4 shadow-lg text-indigo-950 rounded-lg z-300 bg-gradient-to-r from-[#FA5D66] via-[#FFA1C5] via-[#ffdb40] to-[#FA5D66]'
          >
            Let's create something great together !
          </motion.button>
        </div>
      </div>
    </div>
  );
}