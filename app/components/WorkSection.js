'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../lottie/works.json';
import Link from 'next/link';
import Image from 'next/image';
import MK from '../lottie/mk.json'; 
import WK from '../lottie/wk.json'; 
import Sicon from '../lottie/Sicon.json'; 
import Motionicon from '../lottie/Motionicon.json'; 

const WorkSection = () => {
  const sectionRef = useRef(null);
  const lottieRef = useRef(null);
const mkContainerRef = useRef(null); // Reference to the MK container
const wkContainerRef = useRef(null); // Reference to the WK container
const SContainerRef = useRef(null); // Reference to the S container
const MotContainerRef = useRef(null); // Reference to the Mot container

const mkRef = useRef(null); // MK animation instance
const wkRef = useRef(null); // WK animation instance
const SRef = useRef(null);  // S animation instance
const MotRef = useRef(null); // Mot animation instance

useEffect(() => {
  // All container elements and corresponding refs
  const elements = [
    { container: mkContainerRef.current, animation: mkRef.current },
    { container: wkContainerRef.current, animation: wkRef.current },
    { container: SContainerRef.current, animation: SRef.current },
    { container: MotContainerRef.current, animation: MotRef.current },
  ];

  // Function to handle intersection and play animations
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const element = elements.find(el => el.container === entry.target);
        if (element && element.animation) {
          element.animation.play(); // Play the animation
          observer.unobserve(entry.target); // Stop observing after playing
        }
      }
    });
  };

  // Create an Intersection Observer
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5, // Trigger when 50% is visible
  });

  // Observe all container elements
  elements.forEach(({ container }) => {
    if (container) {
      observer.observe(container);
    }
  });

  // Cleanup observer on component unmount
  return () => {
    elements.forEach(({ container }) => {
      if (container) observer.unobserve(container);
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
      <div ref={sectionRef} className="w-full h-screen flex justify-center items-center">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
          className="mb-[-23%] md:w-2/3 md:w-1/2"
          style={{ clipPath: 'inset(0 0 30% 0)' }}
        />
      </div>

      <div className="max-w-7xl  mx-auto py-16 px-4 md:px-8 md:px-12">
        <div className="space-y-24">
          {/* WildKnot Project */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.3 }}
          >
            <div className="w-full md:w-1/2 lg:w-1/3  ">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <div className="absolute top-2 left-2 text-white text-xs font-semibold z-20 py-1 px-2 rounded bg-blue-500">
                  App
                </div>
                <img src="iconbig.png" alt="WildKnot" className="w-full h-auto rounded-lg  aspect-[3/3] object-cover" />
              </div>
            </div>
            <div ref={wkContainerRef} className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center">
                      <Lottie
          lottieRef={wkRef}
          animationData={WK}
          autoplay={false}
          loop={false}
          className=" mb-[-13%] md:w-1/2"
          style={{ clipPath: 'inset(0 0 30% 0)' }}
        />

              <h2 className="text-2xl font-bold text-center  mb-4">WildKnot</h2>
              <p className="text-gray-600 mb-6">
                Knots, tarp setups and lashing construction made easy with animated tutorials and interactive diagrams.
              </p>
              <div className="flex flex-col space-y-4">
                                              <div className="flex justify-center items-center space-x-4">

                <Link href="/wildknot">
                  <motion.button
                    className="text-blue-600 border border-blue-600 rounded px-6 mb-12 py-2 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    View Case Study
                  </motion.button>
                </Link>
                   </div>
    <div className="flex justify-center md:justify-center items-center w-full mt-8 space-x-4">
  <a
    href="https://apps.apple.com/us/app/wildknot/id6502643586"
    target="_blank"
    rel="noopener noreferrer"
    className="w-32 md:w-40"
  >
    <img
      src="/appstore.png"
      alt="Download on App Store"
      className="w-full h-auto rounded-lg"
    />
  </a>
  <a
    href="https://play.google.com/store/apps/datasafety?id=com.jdwapps.knotspioneering&pli=1" 
    target="_blank"
    rel="noopener noreferrer"
    className="w-32 md:w-40"
  >
    <img
      src="/googleplay.png"
      alt="Get it on Google Play"
      className="w-full h-auto rounded-lg"
    />
  </a>
</div>


              </div>
            </div>
          </motion.div>

          {/* Boutique Hotel Project */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.3 }}
          >
            <div className="w-full md:w-1/2 lg:w-1/3 ">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <div className="absolute top-2 left-2 text-white text-xs font-semibold z-20 py-1 px-2 rounded bg-green-500">
                  Web
                </div>
                <img src="ext3.png" alt="Boutique Hotel S" className="w-full h-auto aspect-[3/3] object-cover" />
              </div>
            </div>
            <div ref={SContainerRef} className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center">
                      <Lottie
          lottieRef={SRef}
          animationData={Sicon}
          autoplay={false}
          loop={false}
          className=" mb-[-13%] md:w-1/2"
          style={{ clipPath: 'inset(0 0 30% 0)' }}
        />
              <h2 className="text-2xl font-bold mb-4">Boutique Hotel "S"</h2>
              <p className="text-gray-600 mb-6">
               Website for Boutique Hotel Restaurant "S" Bocas del Toro, Panama. Includes hotel and restaurant presentations as well as 
              </p>
              <div className="flex space-x-4 justify-center">
<motion.a
  href="https://www.hotel-s-bocas.com"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-blue-500 text-white text-sm font-semibold rounded px-6 py-2 hover:bg-blue-600 transition-colors"
  whileHover={{ scale: 1.02 }}
>
  Visit Website
</motion.a>
                <Link href="/hotels">
                  <motion.button
                    className="text-blue-600 border border-blue-600 rounded px-6 py-2 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    View Case Study
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
  {/* Marine Knots Project */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.3 }}
          >
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <div className="absolute top-2 left-2 text-white text-xs font-semibold z-20 py-1 px-2 rounded bg-blue-500">
                  App
                </div>
                <img src="icon.png" alt="Marine Knots Icon" className="w-full h-auto aspect-[3/3] object-cover" />
              </div>
            </div>
            <div ref={mkContainerRef} className="w-full items-center md:w-1/2 lg:w-1/3 flex flex-col justify-center">
                     <Lottie
          lottieRef={mkRef}
          animationData={MK}
          autoplay={false}
          loop={false}
          className=" mb-[-13%] md:w-1/2"
          style={{ clipPath: 'inset(0 0 30% 0)' }}
        />
              <h2 className="text-2xl font-bold mb-4">Marine Knots</h2>
              <p className="text-gray-600 mb-6">
                Master more than 30 marine knots to tackle any situation while onboard.
              </p>
              <div className="flex flex-col space-y-4">
                                              <div className="flex justify-center items-center space-x-4">

                <Link href="/marineknots">
                  <motion.button
                    className="text-blue-600 border border-blue-600 rounded px-6 mb-12 py-2 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    View Case Study
                  </motion.button>
                </Link>
                   </div>
    <div className="flex justify-center md:justify-center items-center w-full mt-8 space-x-4">
  <a
    href="https://apps.apple.com/us/app/marine-knots/id6451214846"
    target="_blank"
    rel="noopener noreferrer"
    className="w-32 md:w-40"
  >
    <img
      src="/appstore.png"
      alt="Download on App Store"
      className="w-full h-auto rounded-lg"
    />
  </a>
  <a
    href="https://play.google.com/store/apps/details?id=com.Noeuds.NoeudsMarins&hl=en" 
    target="_blank"
    rel="noopener noreferrer"
    className="w-32 md:w-40"
  >
    <img
      src="/googleplay.png"
      alt="Get it on Google Play"
      className="w-full h-auto rounded-lg"
    />
  </a>
</div>


              </div>
            </div>
          </motion.div>
         

          {/* Motion Design Project */}
          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.3 }}
          >
            <div className="w-full md:w-1/2 lg:w-1/3 ">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <div className="absolute top-2 left-2 text-white text-xs font-semibold z-20 py-1 px-2 rounded bg-orange-500">
                  Motion
                </div>
                <img src="bg.jpg" alt="Motion Design" className="w-full h-auto aspect-[3/3] object-cover" />
              </div>
            </div>
                       <div ref={MotContainerRef} className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center">
                      <Lottie
          lottieRef={MotRef}
          animationData={Motionicon}
          autoplay={false}
          loop={false}
          className=" mb-[-13%] md:w-1/2"
          style={{ clipPath: 'inset(0 0 30% 0)' }}
        />
              <h2 className="text-2xl font-bold mb-4">Motion Design</h2>
              <p className="text-gray-600 mb-6">
                A selection of animated logos.
              </p>
             <div className="flex justify-center items-center  mb-8 space-x-4">

                <Link href="/motiondesign">
                  <motion.button
                    className="text-blue-600 border border-blue-600 rounded px-6 py-2 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    View Gallery
                  </motion.button>
                </Link>
                   </div>
            </div>
          </motion.div>

        </div>
      </div>
                      <img src="separatorAngle.svg" alt="WildKnot" className="w-screen h-auto object-cover" />

    </motion.div>
  );
};

export default WorkSection;