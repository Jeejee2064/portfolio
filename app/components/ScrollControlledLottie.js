'use client'

import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from '../lottie/apps2.json'; // Ensure this path is correct
import ParallaxHero from './ParallaxHero'

const ScrollControlledLottie = () => {
  const lottieRef = useRef(null);
  const containerRef = useRef(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && isInView) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerHeight = containerRect.height;
        const containerTop = containerRect.top;
        const windowHeight = window.innerHeight;

        let progress;
        if (containerTop > 0) {
          progress = 0;
        } else if (containerTop + containerHeight < windowHeight) {
          progress = 1;
        } else {
          progress = Math.abs(containerTop) / (containerHeight - windowHeight);
        }

        setAnimationProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView]);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0);
      lottieRef.current.goToAndStop(animationProgress * lottieRef.current.getDuration(true), true);
    }
  }, [animationProgress]);

  return (
    <div ref={containerRef} className="relative bg-indigo-950 w-full h-[300vh]">
      <div className="sticky top-0 left-0 z-10 h-screen overflow-hidden">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          className="z-20 mt-4"
          style={{
            clipPath: 'inset(0 0 10% 0)',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </div>



      <div className="  h-[100vh]" />
      <div className="relative z-30 pt-[25vh] h-[100vh]">
        <div className="grid grid-cols-[2fr_0.3fr_2fr] grid-rows-3 h-full gap-8 p-8">
          <div className="col-span-1 row-span-2 bg-blue-500 flex justify-center items-center rounded-lg">
            <span className="text-white">2x1 Cell</span>
          </div>
          <div className="col-span-1 row-span-1  flex justify-center items-center rounded-lg">

          </div>
          <div className="col-span-1 row-span-1 bg-white  flex justify-center items-center rounded-lg">

          </div>
          <div className="col-span-1 row-span-2  flex justify-center items-center rounded-lg">

          </div>
          <div className="bg-green-900 row-span-2 flex justify-center items-center rounded-lg">
            <span className="text-white">1x1 Cell</span>
          </div>
          <div className="bg-green-500 flex justify-center items-center rounded-lg">
            <span className="text-white">1x1 Cell</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollControlledLottie;