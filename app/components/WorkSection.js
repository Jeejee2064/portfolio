'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
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

const WorkSection = () => {
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
      <div ref={sectionRef} className="w-full h-[50vh] md:h-screen flex justify-center items-center">
                      <BGSVGShadow2 />

        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
          className="mb-[-23%] md:w-2/3 md:w-1/2"
          style={{ clipPath: 'inset(0 0 30% 0)' }}
        />
      </div>

      <div className="   mx-auto py-16 md:px-8 md:px-12">
        <div className="space-y-24 ">
          {/* WildKnot Project */}
          <motion.div 
            className="flex z-1000 flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.3 }}
          >
       <div className="w-full md:w-1/2 lg:w-1/3 lg:mr-16">
  <div className="relative rounded-lg pt-8 overflow-hidden md:overflow-visible h-[75vh] md:h-screen w-screen md:w-auto ">
    {/* Label */}
    <div className="absolute top-2 left-2 text-white text-xs font-semibold z-40 py-1 px-2 rounded bg-blue-500">
      App
    </div>
    {/* Image 1 */}
    <motion.img
      src="/wk1.png"
      alt="Screenshot 1"
      className="absolute top-12 left-1/4 h-3/4  shadow-xl  z-30 "
      initial={{ opacity: 0, x: 0 , rotate: 0}}
      whileInView={{ opacity: 1, x: -70, rotate: 17 }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.3 }}
            whileHover={{  scale: 1.05, zIndex: 35, rotate:0}}
            whileTap={{  scale: 1.05, zIndex: 35, rotate:0}}
    />
    {/* Image 2 */}
    <motion.img
      src="/wk2.png"
      alt="Screenshot 2"
      className="absolute top-8 left-1/4 h-3/4 shadow-xl z-20 "
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, rotate: 19 }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.3 }}
      whileHover={{  scale: 1.05, zIndex: 35, rotate:0}}
      whileTap={{  scale: 1.05, zIndex: 35, rotate:0}}

    />
    {/* Image 3 */}
    <motion.img
      src="/wk3.png"
      alt="Screenshot 3"
      className="absolute top-4 left-1/4 h-3/4 z-10 shadow-xl "
      initial={{ opacity: 0, x: 0, rotate: 0 }}
      whileInView={{ opacity: 1, x: 70, rotate: 21 }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.3 }}
      whileHover={{  scale: 1.05, zIndex: 35, rotate:0}}
      whileTap={{  scale: 1.05, zIndex: 35, rotate:0}}
    />
  </div>
</div>

            <div ref={wkContainerRef} className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center">
                     
                      <Lottie
          lottieRef={wkRef}
          animationData={WK}
          autoplay={false}
          loop={false}
          className=" mb-[-13%] w-1/2 "
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
                    className="text-blue-600 border border-blue-600 rounded px-6 py-2 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors"
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
            className="flex flex-col z-1000 md:flex-row items-center justify-center gap-8 md:gap-16"
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
       className=" mb-[-13%] w-1/2 "
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
                    className="text-blue-600 border border-blue-600 rounded px-6 py-2 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors"
  whileHover={{ scale: 1.02 }}
>
  Visit Website
</motion.a>
                <Link href="/hotels">
                  <motion.button
                    className="bg-blue-500 text-white text-sm font-semibold rounded px-6 py-2 hover:bg-blue-600 transition-colors"

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
            className="flex flex-col z-1000 md:flex-row items-center justify-center gap-8 md:gap-16"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.3 }}
          >
             <div className="w-full md:w-1/2 lg:w-1/3 lg:mr-16">
  <div className="relative rounded-lg pt-8 overflow-hidden md:overflow-visible h-[75vh] md:h-screen w-screen md:w-auto ">
    {/* Label */}
    <div className="absolute top-2 left-2 text-white text-xs font-semibold z-40 py-1 px-2 rounded bg-blue-500">
      App
    </div>
    {/* Image 1 */}

    <motion.img
      src="/mk1.png"
      alt="Screenshot 1"
      className="absolute top-2/5 left-1/4 md:left-1/4   h-3/4 shadow-xl  z-30 origin-[50%_100%]"
      initial={{ opacity: 0, x: 0 , rotate: 0}}
      whileInView={{ opacity: 1, x: -20, rotate: -17 }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.3 }}
      whileHover={{  scale: 1.05, zIndex: 35}}
        whileTap={{  scale: 1.05, zIndex: 35,rotate:0, x:20}}
    />
    {/* Image 2 */}
    <motion.img
      src="/mk2.png"
      alt="Screenshot 2"
      className="absolute top-2/5 left-1/4 md:left-1/4 h-3/4 shadow-xl z-20 "
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.3 }}
      whileHover={{  scale: 1.05, zIndex: 35}}
      whileTap={{  scale: 1.05, zIndex: 35}}

    />
    {/* Image 3 */}
    <motion.img
      src="/mk3.png"
      alt="Screenshot 3"
      className="absolute top-2/5 left-1/4  md:left-1/4 h-3/4 z-10 shadow-xl origin-[50%_100%]"
      initial={{ opacity: 0, x: 0, rotate: 0 }}
      whileInView={{ opacity: 1, x: 20, rotate: 17 }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.3 }}
      whileHover={{  scale: 1.05, zIndex: 35}}
      whileTap={{  scale: 1.05, zIndex: 35}}
    />

  </div>
</div>
            <div ref={mkContainerRef} className="w-full items-center md:w-1/2 lg:w-1/3 flex flex-col justify-center">
                     <Lottie
          lottieRef={mkRef}
          animationData={MK}
          autoplay={false}
          loop={false}
       className=" mb-[-13%] w-1/2 "
                 style={{ clipPath: 'inset(0 0 30% 0)' }}
        />
              <h2 className="text-2xl font-bold mb-4">Marine Knots</h2>
              <p className="text-gray-600 p-8 mb-6">
                Master more than 30 marine knots to tackle any situation while onboard.
              </p>
              <div className="flex flex-col space-y-4">
                                              <div className="flex justify-center items-center space-x-4">

                <Link href="/marineknots">
                  <motion.button
                    className="text-blue-600 border border-blue-600 rounded px-6  py-2 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    View Case Study
                  </motion.button>
                </Link>
                   </div>
    <div className="flex justify-center z-1000 md:justify-center items-center w-full mt-8 space-x-4">
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
         .

          {/* Motion Design Project */}
          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.3 }}
          >
            <div className="w-full md:w-1/2 lg:w-1/3 ">
              <div className="relative rounded-lg overflow-hidden ">
                <div className="absolute top-2 left-2 text-white text-xs font-semibold z-20 py-1 px-2 rounded bg-orange-500">
                  Motion
                </div>
                                    <Lottie
         
          animationData={coco}
          autoplay={true}
          loop={true}
          className="  "
          style={{ clipPath: 'inset(0 0 20% 0)' }}
        />
              </div>
            </div>
                       <div ref={MotContainerRef} className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center">
                      <Lottie
          lottieRef={MotRef}
          animationData={Motionicon}
          autoplay={false}
          loop={false}
       className=" mb-[-13%] w-1/2 "
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