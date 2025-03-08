'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from '../lottie/Services.json';
import Link from 'next/link';
import BGSVGShadow2 from './BGSVGShadow2';
import Web from '../lottie/webN2.json';
import Apps from '../lottie/MobileNew.json';
import Motion from '../lottie/motionN2.json';
import localFont from 'next/font/local';

const neon = localFont({
  src: '../Neon.ttf',
});

const Services = () => {
  const sectionRef = useRef(null);
  const lottieRef = useRef(null);
  
  // Refs for each animation
  const webRef = useRef(null);
  const appsRef = useRef(null);
  const motionRef = useRef(null);

  const { scrollYProgress: scrollYProgressBg } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: scrollYProgressLottie } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundColor = useTransform(
    scrollYProgressBg,
    [0.5, 0.8],
    ["#1e1b4b", "#fff"]
  );

  const handleScroll = () => {
    if (lottieRef.current) {
      const totalFrames = lottieRef.current.getDuration(true);
      const frame = scrollYProgressLottie.get() * totalFrames;
      lottieRef.current.goToAndStop(frame, true);
    }
  };

  useEffect(() => {
    return scrollYProgressLottie.on('change', handleScroll);
  }, [scrollYProgressLottie]);

  // Simple play functions for each animation
  const playAnimation = (ref) => {
    if (ref.current) {
      ref.current.goToAndStop(0); // Reset to start
      ref.current.play(); // Play the animation
    }
  };

  return (
    <motion.div className='bg-indigo-950 min-h-screen'>
      <div ref={sectionRef} className="w-full h-[50vh] bg-indigo-950 flex justify-center items-center">
        <BGSVGShadow2/>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
          className="mb-[-23%] md:w-2/3 lg:w-1/2"
          style={{ clipPath: 'inset(0 0 30% 0)' }}
        />
      </div>

      <div className="mt-8  grid space-x-4 space-y-4 grid-cols-1 md:grid-cols-3">
          <motion.div
            className=" px-4"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.4 }}
          >
          <div 
            className="cursor-pointer"
            onMouseEnter={() => playAnimation(appsRef)}
            onTouchStart={() => playAnimation(appsRef)}
          >
            <Lottie
              lottieRef={appsRef}
              animationData={Apps}
              autoplay={false}
              loop={false}
              className="mb-[-15%]"
              style={{ clipPath: 'inset(0 0 23% 0)' }}
            />
          </div>
          <ul className="space-y-2 p-4 ">
            <li className="flex gap-2">
              <span className="text-[#FFA1C5]">•</span>
              <a className='text-white  text-sm'>iOS and Android mobile applications</a>
            </li>
            <li className="flex gap-2">
              <span className="text-[#FFA1C5]">•</span>
              <a className='text-white  text-sm'>User-friendly interface design</a>
            </li>
            <li className="flex gap-2">
              <span className="text-[#FFA1C5]">•</span>
              <a className='text-white  text-sm'>App store submission and support</a>
            </li>
          </ul>
        </motion.div>

        <motion.div
            className=" px-4"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ amount: 0.4 }}
          >
          <div 
            className="cursor-pointer md:mt-16"
            onMouseEnter={() => playAnimation(webRef)}
            onTouchStart={() => playAnimation(webRef)}
          >
            <Lottie
              lottieRef={webRef}
              animationData={Web}
              autoplay={false}
              loop={false}
              className="mb-[-15%]"
              style={{ clipPath: 'inset(0 0 23% 0)' }}
            />
          </div>
          <ul className="space-y-2 p-4 ">
            <li className="flex gap-2">
              <span className="text-[#FA5D66]">•</span>
              <a className='text-white text-sm'>Custom website design for any business need</a>
            </li>
            <li className="flex gap-2">
              <span className="text-[#FA5D66]">•</span>
              <a className='text-white text-sm'>SEO-Optimized pages that rank fast and high in Google</a>
            </li>
            <li className="flex gap-2">
              <span className="text-[#FA5D66]">•</span>
              <a className='text-white text-sm'>Professional deployment and hosting services</a>
            </li>
          </ul>
        </motion.div>

         <motion.div
            className=" px-4"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ amount: 0.4 }}
          >
          <div 
            className="cursor-pointer md:mt-40"
            onMouseEnter={() => playAnimation(motionRef)}
            onTouchStart={() => playAnimation(motionRef)}
          >
            <Lottie
              lottieRef={motionRef}
              animationData={Motion}
              autoplay={false}
              loop={false}
              className="mb-[-15%]"
              style={{ clipPath: 'inset(0 0 23% 0)' }}
            />
          </div>
          <ul className="space-y-2 p-4 ">
            <li className="flex gap-2">
              <span className="text-[#ffdb40]">•</span>
              <a className='text-white  text-sm'>Brand-focused logo design</a>
            </li>
            <li className="flex gap-2">
              <span className="text-[#ffdb40]">•</span>
              <a className='text-white text-sm'>Engaging motion graphics and animations</a>
            </li>
            <li className="flex gap-2">
              <span className="text-[#ffdb40]">•</span>
              <a className='text-white text-sm'>Custom visual content creation</a>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Services;