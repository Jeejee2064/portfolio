'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from '../lottie/works.json';
import Link from 'next/link';
import Image from 'next/image';
import MK from '../lottie/mk.json';
import WK from '../lottie/wk.json';
import Sicon from '../lottie/Sicon.json';
import coco from '../lottie/coco.json';
import Motionicon from '../lottie/Motionicon.json';
import BGSVGShadow2 from './BGSVGShadow2';
import GradientButton from './GradientButton';

const WorkSection = () => {
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);
  const imageRef3 = useRef(null);
  const imageRef4 = useRef(null);
  const imageRef5 = useRef(null);
  const imageRef6 = useRef(null);

  useEffect(() => {
    if (imageRef1.current) {
      imageRef1.current.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    if (imageRef2.current) {
      imageRef2.current.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    if (imageRef3.current) {
      imageRef3.current.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    if (imageRef4.current) {
      imageRef4.current.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    if (imageRef5.current) {
      imageRef5.current.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    if (imageRef6.current) {
      imageRef6.current.addEventListener('contextmenu', (e) => e.preventDefault());
    }
  }, []);

  const sectionRef = useRef(null);
  const lottieRef = useRef(null);

  // Container refs for each Lottie animation
  const mkContainerRef = useRef(null);
  const wkContainerRef = useRef(null);
  const SContainerRef = useRef(null);
  const MotContainerRef = useRef(null);

  // Lottie animation refs
  const mkRef = useRef(null);
  const wkRef = useRef(null);
  const SRef = useRef(null);
  const MotRef = useRef(null);

  useEffect(() => {
    // Function to handle intersection for a single Lottie animation
    const createIntersectionHandler = (lottieRef) => (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          // Play the animation when at least 30% is visible
          lottieRef.current?.play();
          // Stop observing this element after playing
          observer.unobserve(entry.target);
        }
      });
    };

    // Create observers for each Lottie animation
    const observers = [
      {
        container: mkContainerRef.current,
        handler: createIntersectionHandler(mkRef),
      },
      {
        container: wkContainerRef.current,
        handler: createIntersectionHandler(wkRef),
      },
      {
        container: SContainerRef.current,
        handler: createIntersectionHandler(SRef),
      },
      {
        container: MotContainerRef.current,
        handler: createIntersectionHandler(MotRef),
      }
    ];

    // Create and start observing each container
    const intersectionObservers = observers.map(({ container, handler }) => {
      if (!container) return null;

      const observer = new IntersectionObserver(handler, {
        threshold: 0.3 // Trigger when 30% is visible
      });

      observer.observe(container);
      return observer;
    }).filter(Boolean); // Remove any null observers

    // Cleanup function to stop observing
    return () => {
      intersectionObservers.forEach(observer => {
        observers.forEach(({ container }) => {
          if (container) observer.unobserve(container);
        });
      });
    };
  }, []);


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
    [0.6, 0.9],
    ["#1e1b4b", "#ffffff"]
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

  return (
    <motion.div style={{ backgroundColor }}>
      <div ref={sectionRef} className="w-full h-[50vh] mb-8 lg:mb-16 flex justify-center items-center">

        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
          className="mb-[-23%] md:w-2/3 md:w-1/2"
          style={{ clipPath: 'inset(0 0 30% 0)' }}
        />
      </div>

      <div className="   mx-auto flex justify-center py-16 ">
        <div className="   grid grid-cols-1 mx-2 space-x-3 space-y-3 lg:w-2/3 md:grid-cols-2">
          
          <a
                    href="https://hotel-s-bocas.com"
                    target="_blank"
                    rel="noopener noreferrer"> 
          <motion.div
            className=" h-full w-full md:flex md:justify-end"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.4 }}
          >

        
              <div className="relative md:w-2/3 h-[60vh] rounded-lg overflow-hidden w-full shadow-lg group">
                {/* Top-left badge */}
                <div className="absolute top-2 left-2 text-white text-xs font-semibold z-20 py-1 px-2 rounded bg-[#ffdb40]">
                  Web
                </div>
                
                {/* Image */}
                <img 
                  src="ext3.png" 
                  alt="Boutique Hotel S" 
                  className=" h-full w-full object-cover" 
                />
                
                {/* Text with gradient background */}
                <div 
                  className="absolute bottom-0 inset-x-0 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                >
                  {/* Gradient background */}
                  <div className="bg-gradient-to-t from-indigo-950 via-indigo-950/75 to-transparent w-full pt-12 pb-4 ">
                    <p className="text-sm font-medium text-gray-100 px-4 text-center">
                      Website for Boutique Hotel Restaurant "S" Bocas del Toro, Panama.
                    </p>
                       
                  </div>
                </div>
              </div>
        
           
          </motion.div>
                  </a>

           <Link href="/wildknot">
              <motion.div
            className="relative md:flex md:justify-end items-end md:flex-col h-full   group"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              viewport={{ amount: 0.4 }}
            >
             <div className=' h-auto relative '>
                {/* Top-left badge */}
                <div className="absolute top-2 left-2 text-white text-xs font-semibold z-20 py-1 px-2 rounded bg-[#FFA1C5]">
                  App
                </div>
                
                {/* Image */}
                <img 
                  src="descrit.png" 
                  alt="Boutique Hotel S" 
                  className="object-cover rounded-lg" 
                />
                
                {/* Text with gradient background */}
                <div 
                  className="absolute bottom-0 inset-x-0 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                >
                  {/* Gradient background */}
                  <div className="bg-gradient-to-t from-indigo-950 via-indigo-950/75 to-transparent w-full pt-12 pb-4">
                    <p className="text-sm font-medium text-gray-100 px-4 text-center">
                      Master Knots, Lashings, Tarp setups and constructions with animated tutorials !
                    </p>
                  </div>
                </div>
               </div>
            </motion.div>
        </Link>

  <Link href="/marineknots">         
           <motion.div
            className="relative rounded-lg   overflow-hidden shadow-lg group"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.4 }}
          >

        
                {/* Top-left badge */}
                <div className="absolute top-2 left-2 text-white text-xs font-semibold z-20 py-1 px-2 rounded bg-[#FFA1C5]">
                 App
                </div>
                
                {/* Image */}
                <img 
                  src="mkLogo.png" 
                  alt="Boutique Hotel S" 
                  className="w-full h-full object-cover" 
                />
                
                {/* Text with gradient background */}
                <div 
                  className="absolute bottom-0 inset-x-0 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                >
                  {/* Gradient background */}
                  <div className="bg-gradient-to-t from-indigo-950 via-indigo-950/75 to-transparent w-full pt-12 pb-4 ">
                    <p className="text-sm font-medium text-gray-100 px-4 text-center">
                      Tie the Perfect Knot Every Time with Our Easy-to-Follow 2D Animations.
                    </p>
                       
                  </div>
                </div>
              
              
           
          </motion.div>
  </Link>
 <Link href="/motion">
    <motion.div
            className=" h-full w-full "
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.4 }}
          >

        
              <div className="relative md:w-2/3 h-[60vh] rounded-lg overflow-hidden w-full shadow-lg group">
                {/* Top-left badge */}
                <div className="absolute top-2 left-2 text-white text-xs font-semibold z-20 py-1 px-2 rounded bg-[#FA5D66]">
                  Motion Design
                </div>
                
                {/* Image */}
                <Lottie

                  animationData={coco}
                  autoplay={true}
                  loop={true}
                  className="  "
                  style={{ clipPath: 'inset(0 0 20% 0)' }}
                />
                
                {/* Text with gradient background */}
                <div 
                  className="absolute bottom-0 inset-x-0 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                >
                  {/* Gradient background */}
                  <div className="bg-gradient-to-t from-indigo-950 via-indigo-950/75 to-transparent w-full pt-12 pb-4 ">
                    <p className="text-sm font-medium text-gray-100 px-4 text-center">
                      A selection of animated logos and animations
                    </p>
                       
                  </div>
                </div>
              </div>
        
           
          </motion.div>
            </Link>
           </div>
            </div>
                  <img src="separatorAngle.svg" alt="wave separator" className="w-screen h-auto object-cover" />
          </motion.div> 
  );
};

export default WorkSection;