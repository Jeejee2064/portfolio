'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../lottie/contact.json';
import Link from 'next/link';
import BGSVGShadow2 from './BGSVGShadow2';

const Contact = () => {
  
  const sectionRef = useRef(null);
  const lottieRef = useRef(null);

  // First scrollYProgress for background color transition with "start start" offset
  const { scrollYProgress: scrollYProgressBg } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Second scrollYProgress for Lottie animation control with "start end" offset
  const { scrollYProgress: scrollYProgressLottie } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Background color transition
  const backgroundColor = useTransform(
    scrollYProgressBg,
    [0.5, 0.8],
    ["#1e1b4b", "#fff"] // From dark color to white
  );

  // Handle scroll for Lottie animation frames
  const handleScroll = () => {
    if (lottieRef.current) {
      const totalFrames = lottieRef.current.getDuration(true);
      const frame = scrollYProgressLottie.get() * totalFrames;
      lottieRef.current.goToAndStop(frame, true);
    }
  };

  // Effect to trigger Lottie animation frames on scroll
  useEffect(() => {
    return scrollYProgressLottie.on('change', handleScroll);
  }, [scrollYProgressLottie]);

  return (
    <motion.div style={{ backgroundColor }}>
      <div ref={sectionRef} className="w-full h-screen flex justify-center items-center">
               <BGSVGShadow2 />

        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
          className=" mb-[-23%] md:w-2/3 lg:w-1/2"
          style={{ clipPath: 'inset(0 0 30% 0)' }}
        />
      </div>

      <div className="min-h-screen bg-blue-200">
       
      </div>
    </motion.div>
  );
};

export default Contact;
