'use client'
import Knots from '../components/Knots';
import { Pacifico } from "next/font/google";
import { motion, useTransform, useScroll } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import Link from 'next/link';

import MK from '../lottie/mkLong.json';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
});

const MarineKnots = () => {
  const screen1 = useRef(null)
  const [animationComplete, setAnimationComplete] = useState(false);

  const { scrollYProgress } = useScroll({
    target: screen1,
    offset: ["start end", "end end"]
  })

  const rotateD = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const rotateG = useTransform(scrollYProgress, [0, 1], [0, -22]);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const imageRef4 = useRef(null);
  const imageRef5 = useRef(null);
  const imageRef6 = useRef(null);
    const mkContainerRef = useRef(null);
  const mkRef = useRef(null);


  useEffect(() => {
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

  return (
    <div>
      {!animationComplete ? (
        <div className="fixed inset-0 bg-[#283061] flex items-center justify-center z-50">
          <Lottie
            animationData={MK}
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
        >
          <div className="flex bg-[#283061] flex-col md:flex-row md:items-center md:justify-center ">
           <div className="w-full md:w-1/2 lg:w-1/3 lg:mr-16">
              <motion.div
            className="flex flex-col z-1000 md:flex-row items-center justify-center gap-8 md:gap-16"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.3 }}
          >
            <div className="w-full md:w-1/2 lg:w-1/3 lg:mr-16">
              <div className="relative rounded-lg pt-8 overflow-hidden md:overflow-visible h-[75vh] lg:h-[75vh]  md:h-screen w-screen md:w-auto ">
                

                <motion.img
                  ref={imageRef4}

                  src="/mk1.png"
                  alt="Screenshot Marine Knots 1"
                  className="absolute top-2/5 left-1/3 md:left-1/4 h-3/4 shadow-xl  z-30 origin-[50%_100%]"
                  initial={{ opacity: 0, x: 0, rotate: 0 }}
                  whileInView={{ opacity: 1, x: -20, rotate: -17 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ amount: 0.3 }}
                  whileHover={{ scale: 1.05, zIndex: 35 }}
                  whileTap={{ scale: 1.05, zIndex: 35 }}
                />
             
                <motion.img
                  ref={imageRef5}

                  src="/mk2.png"
                  alt="Screenshot Marine Knots 2"
                  className="absolute top-2/5 left-1/3 md:left-1/4 h-3/4 shadow-xl z-20 "
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ amount: 0.3 }}
                  whileHover={{ scale: 1.05, zIndex: 35 }}
                  whileTap={{ scale: 1.05, zIndex: 35 }}

                />
             
                <motion.img
                  ref={imageRef6}

                  src="/mk3.png"
                  alt="Screenshot Marine Knots 3"
                  className="absolute top-2/5 left-1/3  md:left-1/4 h-3/4 z-10 shadow-xl origin-[50%_100%]"
                  initial={{ opacity: 0, x: 0, rotate: 0 }}
                  whileInView={{ opacity: 1, x: 20, rotate: 17 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ amount: 0.3 }}
                  whileHover={{ scale: 1.05, zIndex: 35 }}
                  whileTap={{ scale: 1.05, zIndex: 35 }}
                />

              </div>
            </div>
            
          </motion.div>
            </div>
            <div className="md:w-1/2 lg:w-1/3 flex flex-col  md:h-auto justify-center items-center my-4 px-8 md:mb-0  ">
                      <motion.img variants={itemVariants} className='h-32 w-auto' src="/mkLogo.png" alt="SVG logo" />

              <motion.p
                className="text-md  text-gray-200 text-sm"
                variants={itemVariants}
              >
                Marine Knots is an interactive mobile app teaching over 30 nautical knots, developed by a solo beginner programmer over 9 months. The entire app was coded on a 9.60m sailboat using a solar-powered microcomputer (Raspberry Pi 3).
              </motion.p>
                 <motion.div 
              variants={itemVariants}
              className="flex justify-center z-1000 mt-4 items-center w-full  space-x-4">
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
                </motion.div>
              <motion.div
                className='flex flex-col mt-4 md:flex  items-center justify-center md:justify-evenly'
                variants={itemVariants}
              >
                <div className=' bg-indigo-950 p-2 mb-12 text-center rounded-lg text-gray-200'>
                  Tech Stack
                  <div className='w-full flex justify-evenly text-gray-300 text-sm  gap-6'>
                    <div className='justify-center flex flex-col items-center'>
                      <img className='h-16' src="/React.webp" alt="React logo" />
                      React Native
                    </div>
                    <div className='justify-center flex flex-col items-center'>
                      <img className='h-16' src="/SVGLogo.svg" alt="SVG logo" />
                      SVG
                    </div>
                    <div className='justify-center flex flex-col items-center'>
                      <img className='h-16' src="/reanimated.svg" alt="Reanimated logo" />
                      Reanimated
                    </div>
                    <div className='justify-center flex flex-col items-center'>
                      <img className='h-16' src="/i18next.png" alt="i18Next logo" />
                      i18Next
                    </div>
                  </div>
                </div>
              </motion.div>
           
            </div>
          </div>
          <div className='flex flex-col md:flex-row justify-center bg-[#283061] w-screen justify-center items-center '>
            <div className="w-3/4  md:w-1/2 md:block hidden  ">
                                    <img className='h-full w-full' src="/icon.png" alt="SVG logo" />

            </div>

            <div className="w-full md:w-1/2 p-4 px-8  my-12  rounded-lg  flex flex-col justify-center">
              <motion.h1
                className="text-xl text-[#ffc107] font-bold mb-4"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                Key Features:
              </motion.h1>
              <ul>
                {[
                  "Animated tutorials for 30+ nautical knots",
                  "2 ways of animating knots: step-by-step or continuous scrolling",
                  "Intelligent knot selection guide based on user's situation",
                  "Detailed technical information for each knot",
                  "Customizable favorite knot list for quick access",
                  "100% offline functionality",
                  "Available in English, French, Spanish, Portugese and German"
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-200 mb-2"
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <img src='/separator2.svg' className='w-screen mt-[-3%]' />

          <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                className="text-3xl font-extrabold text-[#ffc107] sm:text-4xl flex justify-center items-center"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                App Reviews
              </motion.h2>
              <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2">
                <div className="p-6 rounded-lg text-[#283061] text-lg font-medium">
                  <motion.p
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    &quot;Very good app for learning or getting back into marine knots. Simple and effective, it has everything you need. Really handy, even for beginners! To be used without moderation.&quot;
                  </motion.p>
                  <p className="mt-4 text-gray-400 text-sm font-semibold">- Gil Lou Moustache</p>
                </div>

                <div className="p-6 rounded-lg text-[#283061] text-lg font-medium">
                  <motion.p
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    &quot;An essential app for sailors of any level. Smooth and fast app, very easy to understand.&quot;
                  </motion.p>
                  <p className="mt-4 text-gray-400 text-sm font-semibold">- Johan Minio</p>
                </div>
              </div>
            </div>
          </section>
          <img src='/separator3.svg' className='w-screen' />

          <div className='bg-[#283061] md:flex'>
            <div className="md:w-1/2 p-12  flex flex-col justify-center rounded-lg shadow-lg">
              <motion.h1
                className="text-3xl text-[#ffc107] text-center font-bold mb-4"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                Test it yourself !
              </motion.h1>
              <motion.p
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-gray-200 mb-2"
              >
                - Click on the buttons (1, 2, 3, 4, 5) to advance step by step
              </motion.p>
              <motion.p
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-gray-200 mb-2"
              >
                - Use the slider to animate the knot more precisely
              </motion.p>
              <motion.p
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-gray-200 mb-2"
              >
                - Click on the Use & Features button to know more about this knot !
              </motion.p>
            </div>
            <div className="md:w-1/2">
              <Knots />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MarineKnots;