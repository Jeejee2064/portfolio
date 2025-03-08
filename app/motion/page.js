'use client';
import { motion } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import MotionAnim from '../lottie/motion5.json';
import tenteAnim from '../lottie/tenteanim.json'; // Animation for the first cell
import anim2 from '../lottie/staywild.json'; // Animation for the second cell
import anim3 from '../lottie/caribeo.json'; // Animation for the third cell
import anim4 from '../lottie/shotel.json'; // Animation for the fourth cell

const MotionDesign = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const tenteRef = useRef(null);
  const anim2Ref = useRef(null);
  const anim3Ref = useRef(null);
  const anim4Ref = useRef(null);

  const [isTentePlaying, setIsTentePlaying] = useState(false);
  const [isAnim2Playing, setIsAnim2Playing] = useState(false);
  const [isAnim3Playing, setIsAnim3Playing] = useState(false);
  const [isAnim4Playing, setIsAnim4Playing] = useState(false);

  // Function to initialize an animation to its last frame
  const initializeAnimation = (animationRef) => {
    if (animationRef.current) {
      const lottieInstance = animationRef.current;
      const totalFrames = lottieInstance.getDuration(true); // Get total frames
      lottieInstance.goToAndStop(totalFrames, true); // Go to the last frame
    }
  };

  // Function to handle click for animations
  const handleAnimationClick = (animationRef, isPlaying, setIsPlaying) => {
    if (animationRef.current) {
      const lottieInstance = animationRef.current;
      setIsPlaying(true);
      lottieInstance.goToAndStop(0, true); // Go to the start frame
      lottieInstance.play(); // Play the animation
    }
  };

  // Function to handle animation completion
  const handleAnimationComplete = (animationRef, setIsPlaying) => {
    if (animationRef.current) {
      const lottieInstance = animationRef.current;
      lottieInstance.goToAndStop(lottieInstance.getDuration(true), true); // Go to the last frame after playing
      setIsPlaying(false); // Reset playing state
    }
  };

  // Initialize animations to their last frame after they are loaded
  useEffect(() => {
    if (animationComplete) {
      setTimeout(() => {
        initializeAnimation(tenteRef);
        initializeAnimation(anim2Ref);
        initializeAnimation(anim3Ref);
        initializeAnimation(anim4Ref);
      }, 100); // Small delay to ensure Lottie instances are fully loaded
    }
  }, [animationComplete]);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      {!animationComplete ? (
        <div className="fixed inset-0 bg-[#283061] flex items-center justify-center z-50">
          <Lottie
            animationData={MotionAnim}
            loop={0}
            className="w-4/5 max-w-md"
            style={{
              clipPath: 'inset(0 0 20% 0)',
            }}
            onComplete={() => setAnimationComplete(true)}
          />
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={pageVariants}
          className="bg-indigo-950 min-h-screen"
        >
          <div className=" h-full gap-8 p-8">
            {/* First Animation */}
            <motion.div
              className=" flex justify-center items-center rounded-lg"
              variants={itemVariants}
            >
              <Lottie
                lottieRef={anim3Ref}
                animationData={anim3}
                autoplay={false}
                loop={false}
                className="z-20 w-full h-full object-contain "
                style={{ clipPath: 'inset(0 0 20% 0)' }}
                onClick={() => handleAnimationClick(anim3Ref, isAnim3Playing, setIsAnim3Playing)}
                onComplete={() => handleAnimationComplete(anim3Ref, setIsAnim3Playing)}
                onLoadedImages={() => initializeAnimation(anim3Ref)} // Initialize to last frame after loading
              />
            </motion.div>

            {/* Second Animation */}
            <motion.div
              className=" flex justify-center items-center rounded-lg"
              variants={itemVariants}
            >
              <Lottie
                lottieRef={tenteRef}
                animationData={tenteAnim}
                autoplay={false}
                loop={false}
                className="z-20 w-full h-full object-contain "
                style={{ clipPath: 'inset(0 0 40% 0)' }}
                onClick={() => handleAnimationClick(tenteRef, isTentePlaying, setIsTentePlaying)}
                onComplete={() => handleAnimationComplete(tenteRef, setIsTentePlaying)}
                onLoadedImages={() => initializeAnimation(tenteRef)} // Initialize to last frame after loading
              />
            </motion.div>

            {/* Third Animation */}
            <motion.div
              className="flex justify-center max-h-[70vh]items-center rounded-lg"
              variants={itemVariants}
            >
              <Lottie
                lottieRef={anim2Ref}
                animationData={anim2}
                autoplay={false}
                loop={false}
                className="z-20 w-full h-full  object-contain "
                style={{ clipPath: 'inset(0 0 30% 0)' }}
                onClick={() => handleAnimationClick(anim2Ref, isAnim2Playing, setIsAnim2Playing)}
                onComplete={() => handleAnimationComplete(anim2Ref, setIsAnim2Playing)}
                onLoadedImages={() => initializeAnimation(anim2Ref)} // Initialize to last frame after loading
              />
            </motion.div>

            {/* Fourth Animation */}
            <motion.div
              className="flex justify-center  max-h-64 items-center rounded-lg"
              variants={itemVariants}
            >
              <Lottie
                lottieRef={anim4Ref}
                animationData={anim4}
                autoplay={false}
                loop={false}
                className="z-20 w-full  h-full object-contain "
                style={{ clipPath: 'inset(0 0 25% 0)' }}
                onClick={() => handleAnimationClick(anim4Ref, isAnim4Playing, setIsAnim4Playing)}
                onComplete={() => handleAnimationComplete(anim4Ref, setIsAnim4Playing)}
                onLoadedImages={() => initializeAnimation(anim4Ref)} // Initialize to last frame after loading
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MotionDesign;