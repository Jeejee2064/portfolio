'use client'

import React, { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';

import MK from '../lottie/mk.json'; // Ensure this path is correct
import WK from '../lottie/wk.json'; // Ensure this path is correct

const Apps = () => {
  const mkContainerRef = useRef(null); // Reference to the container div for MK Lottie
  const wkContainerRef = useRef(null); // Reference to the container div for WK Lottie
  const mkRef = useRef(null);
  const wkRef = useRef(null);

  useEffect(() => {
    const mkElement = mkContainerRef.current;
    const wkElement = wkContainerRef.current;

    // Function to handle intersection and play the animation
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (entry.target === mkElement) {
            mkRef.current.play(); // Play the MK animation when 50% visible
          } else if (entry.target === wkElement) {
            wkRef.current.play(); // Play the WK animation when 50% visible
          }
          observer.unobserve(entry.target); // Stop observing after playing once
        }
      });
    };

    // Create an Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Trigger when 50% is visible
    });

    // Observe both Lottie containers
    if (mkElement) {
      observer.observe(mkElement);
    }
    if (wkElement) {
      observer.observe(wkElement);
    }

    // Cleanup observer on component unmount
    return () => {
      if (mkElement) observer.unobserve(mkElement);
      if (wkElement) observer.unobserve(wkElement);
    };
  }, []);

  return (
    <div className="relative w-full bg-blue-950">
   <div className='w-full flex justify-center'>
        <img className='mt-4 mb-8 h-20' src="/mobile.svg" alt="mobile logo" />
</div>
<div className='md:flex'>
      <div className=" md:w-[50vw]" ref={mkContainerRef}>
      <div className='flex justify-center'>
        <Lottie
          lottieRef={mkRef}
          animationData={MK}
          loop={false}
          autoplay={false} // Ensure autoplay is off to manually control
          className="flex w-4/5 mb-[-20%]"
          style={{
            clipPath: 'inset(0 0 20% 0)',
          }}
        />
        </div>
         <div className='flex flex-col mt-8 md:flex my-4 items-center justify-center md:justify-evenly'>
         <div className='flex justify-center space-x-4'>
             <img className='md:w-1/3 w-2/5' src="/appstore.png" alt="appstore badge"/>
             <img className='md:w-1/3 w-2/5' src="/googleplay.png" alt="appstore badge"/>
             </div>
             <h2 className=' mt-4 px-4 py-2 bg-blue-300 rounded-lg text-[#283061]'>Test the app here and now !</h2>
       </div>
      </div>

 

      <div className="md:w-[50vw]" ref={wkContainerRef}>
            <div className='flex justify-center'>

        <Lottie
          lottieRef={wkRef}
          animationData={WK}
          loop={false}
          autoplay={false} // Ensure autoplay is off to manually control
          className="flex w-4/5 mb-[-20%]"
          style={{
            clipPath: 'inset(0 0 20% 0)',
          }}
        />
                </div>

         <div className='flex flex-col mt-8 md:flex my-4 items-center justify-center md:justify-evenly'>
         <div className='flex justify-center space-x-4'>
             <img className='md:w-1/3 w-2/5' src="/appstore.png" alt="appstore badge"/>
             <img className='md:w-1/3 w-2/5' src="/googleplay.png" alt="appstore badge"/>
             </div>
             <h2 className=' mt-4 px-4 py-2 bg-blue-300 rounded-lg text-[#283061]'>Test the app here and now !</h2>
       </div>
      </div>
      </div>
    </div>
  );
};

export default Apps;
