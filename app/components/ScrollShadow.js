'use client'
import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from '../lottie/BG.json';

const ScrollShadow = () => {
  const sectionRef = useRef(null);
  const lottieRef = useRef(null);
  
  // Using useScroll to track section's position
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to x and y positions for logo shadow
  const x = useTransform(scrollYProgress, [0, 1], [-10, 13]);
  const y = useTransform(scrollYProgress, [0, 1], [-10, 11]);
  
  // Update Lottie animation progress based on scroll
  const handleScroll = () => {
    if (lottieRef.current) {
      // Get total frames of the animation
      const totalFrames = lottieRef.current.getDuration(true);
      // Set the current frame based on scroll progress
      const frame = scrollYProgress.get() * totalFrames;
      lottieRef.current.goToAndStop(frame, true);
    }
  };

  // Subscribe to scroll progress changes
  React.useEffect(() => {
    return scrollYProgress.on('change', handleScroll);
  }, [scrollYProgress]);

  return (
    <section 
      ref={sectionRef}
      className="h-screen w-screen flex  relative bg-indigo-950 flex "
    >
      {/* Lottie background */}
      <div className="absolute top-0 left-0  w-screen h-screen">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
         className='object-cover h-full w-[150vw]'
        />
      </div>
      
      {/* Logo container */}
      <div className="relative z-10">
        {/* Base SVG */}
        <Image
          src="/mwm.svg"
          alt="MWM Logo"
          width={400}
          height={400}
          className="relative z-10"
        />
        
        {/* Animated black SVG */}
        <motion.div
          style={{
            x,
            y,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          className="z-0"
        >
          <Image
            src="/mwmBlack.svg"
            alt="MWM Black Logo"
            width={400}
            height={400}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollShadow;