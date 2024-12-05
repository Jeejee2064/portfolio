'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from '../lottie/about.json';
import Link from 'next/link';
import BGSVGShadow2 from './BGSVGShadow2';
import watasani from '../lottie/watasani.json';

const AboutMe = () => {
  
  const sectionRef = useRef(null);
  const lottieRef = useRef(null);

  // First scrollYProgress for background color transition with "start start" offset
  const { scrollYProgress: scrollYProgressBg } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Second scrollYProgress for Lottie animation control with "start end" offset
  const { scrollYProgress: scrollYProgressLottie } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Background color transition
  const backgroundColor = useTransform(
    scrollYProgressBg,
    [0.1, 0.4],
    ["#fff", "#1e1b4b"] // From dark color to white
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
    <motion.div className='bg-indigo-950' >
      <div ref={sectionRef} className="w-full bg-indigo-950 mb-8  h-[50vh] md:h-screen flex justify-center items-center">
               <BGSVGShadow2 />

        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
          className=" mb-[-23%] md:w-2/3 lg:w-1/2 "
          style={{ clipPath: 'inset(0 0 30% 0)' }}
        />
      </div>

    
       <motion.div 
            className="flex z-1000 flex-col md:flex-row items-center justify-center  gap-8 md:gap-16"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.3 }}
          >
            <div className="w-full md:w-1/2  mt-8">
                     <Lottie
         
          animationData={watasani}
          autoplay={true}
          loop={true}
          className=" mb-[-23%] w-full "
          style={{ clipPath: 'inset(0 0 30% 0)' }}
        />
                   </div>
<div className="w-full md:w-1/2 lg:w-1/3 mt-8 px-12 flex flex-col items-center justify-center text-white">
            Developer, sailor, and educator living from my boat in Panama. My journey spans from marine ecology to teaching science, math, and music in primary school. When I'm not coding or teaching, you'll find me making music with synthesizers and various electronic instruments. Like the ecosystems I studied, I approach development and education with an eye for natural flow and seamless integration.
<p>
Living on the water keeps me anchored to what matters: simplicity, functionality, and the joy of creating and sharing.
   </p>
            </div>
          </motion.div>


    </motion.div>
  );
};

export default AboutMe;
