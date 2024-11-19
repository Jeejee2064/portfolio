'use client'
import Knots from '../components/Knots';
import ScrollShadow from '../components/ScrollShadow';
import { Pacifico } from "next/font/google";
import { motion, useTransform, useScroll } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import Link from 'next/link';

import MK from '../lottie/mk.json'; // Ensure this path is correct
// Import the font
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
});





const MarineKnots = () => {


  const screen1 = useRef(null)

  const { scrollYProgress } = useScroll({
    target: screen1,
    offset: ["start end", "end end"]
  })

  const rotateD = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const rotateG = useTransform(scrollYProgress, [0, 1], [0, -22]);

  return (
    <div>
      <div className="flex bg-[#283061] h-screen flex-col md:flex-row md:items-center md:justify-between ">

        <div className="md:w-1/2    flex flex-col h-screen justify-center items-center rounded-lg ">
          <Lottie
            animationData={MK}
            loop={0}
            className="flex w-4/5 "
            style={{
              clipPath: 'inset(0 0 20% 0)',
            }}
          />

          <div className='flex justify-center px-8 space-x-8 items-center'>

            <Link className='w-full' href='https://apps.apple.com/us/app/marine-knots/id6451214846'>
              <img src="/appstore.png" alt="App Store badge" className='rounded-lg'/>
            </Link>

            <Link className='w-full' href='https://play.google.com/store/apps/details?id=com.Noeuds.NoeudsMarins&hl=en'>
              <img src="/googleplay.png" alt="Google Play badge" className='rounded-lg'/>
            </Link>

          </div>
        </div>
        <div className="md:w-1/2 flex flex-col h-screen justify-center items-center my-4 px-8 md:mb-0  ">

          <p className="text-md mt-12 text-gray-200">
            Marine Knots is an interactive mobile app teaching over 30 nautical knots, developed by a solo beginner programmer over 9 months. The entire app was coded on a 9.60m sailboat using a solar-powered microcomputer (Raspberry Pi 3).
          </p>
          <div className='flex flex-col mt-8 md:flex my-4 items-center justify-center md:justify-evenly'>

            <div className='mt-8 bg-indigo-950 p-2 text-center rounded-lg text-gray-200'>
              Tech Stack
              <div className='w-full flex justify-evenly text-gray-300 mt-4 gap-6'>
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
                  <img className='h-16' src="/image.avif" alt="i18Next logo" />
                  i18Next
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-center bg-[#283061] w-full h-screen'>
        {/* Left Section with Images */}
        <div ref={screen1} className="w-full h-full md:w-1/2 py-16 my-64  md:my-8 md:mb-0 mx-4 relative flex justify-center items-center">
          <motion.img
            style={{ rotate: rotateD, transformOrigin: '50% 100%' }}
            src="/651.png"
            alt="Feature 1"
            className="absolute w-1/2 md:w-1/3 rounded-lg shadow-lg object-cover"
          />
          <motion.img
            style={{ rotate: rotateG, transformOrigin: '50% 100%' }}
            src="/652.png"
            alt="Feature 2"
            className="absolute w-1/2 md:w-1/3 rounded-lg shadow-lg object-cover"
          />
          <motion.img
            src="/654.png"
            alt="Feature 3"
            className="absolute w-1/2 md:w-1/3 rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Right Section with Text */}
        <div className="w-full md:w-1/2 p-4 mt-12  rounded-lg shadow-lg flex flex-col justify-center">
          <motion.h1
            className="text-3xl text-[#ffc107] font-bold mb-4"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }} // Initial state
            transition={{ duration: 0.5 }}
          >
            Key Features:
          </motion.h1>

          {[
            "- Animated tutorials for 30+ nautical knots",
            "- 2 ways of animating knots: step-by-step or continuous scrolling",
            "- Intelligent knot selection guide based on user's situation",
            "- Detailed technical information for each knot",
            "- Customizable favorite knot list for quick access",
            "- 100% offline functionality",
            "- Available in English, French, Spanish, Portugese and German"
          ].map((feature, index) => (
            <motion.p
              key={index}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }} // Initial state
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-200 mb-2"
            >
              {feature}
            </motion.p>
          ))}
        </div>
      </div>

      <img src='/separator2.svg' className='w-screen' />

      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[#ffc107] sm:text-4xl flex justify-center items-center">

            App Reviews
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2">
            {/* Testimonial 1 */}
            <div className="p-6 rounded-lg text-[#283061] text-lg font-medium">
              <p>

                &quot;Very good app for learning or getting back into marine knots. Simple and effective, it has everything you need. Really handy, even for beginners! To be used without moderation.&quot;

              </p>
              <p className="mt-4 text-gray-400 text-sm font-semibold">- Gil Lou Moustache</p>
            </div>

            {/* Testimonial 2 */}
            <div className=" p-6 rounded-lg  text-[#283061] text-lg font-medium">

              <p>

                &quot;An essential app for sailors of any level. Smooth and fast app, very easy to understand.&quot;



              </p>
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
            initial={{ opacity: 0, y: 20 }} // Initial state
            transition={{ duration: 0.5 }}
          >
            Test it yourself !
          </motion.h1>
          <motion.p

            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }} // Initial state
            transition={{ duration: 0.5 }}
            className="text-lg text-gray-200 mb-2"
          >
            - Click on the buttons (1, 2, 3, 4, 5) to advance step by step
          </motion.p>
          <motion.p

            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }} // Initial state
            transition={{ duration: 0.5 }}
            className="text-lg text-gray-200 mb-2"
          >
            - Use the slider to animate the knot more precisely
          </motion.p>
          <motion.p

            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }} // Initial state
            transition={{ duration: 0.5 }}
            className="text-lg text-gray-200 mb-2"
          >
            - Click on the Use & Features button to know more about this knot !
          </motion.p>
        </div>
        <div className="md:w-1/2  ">
          <Knots />
        </div>
      </div>
    
    </div>
  );
};

export default MarineKnots;
