'use client'

import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from '../lottie/motion5.json'; // Main animation
import tenteAnim from '../lottie/tenteanim.json'; // Animation for the first cell
import anim2 from '../lottie/staywild.json'; // Animation for the second cell
import anim3 from '../lottie/caribeo.json'; // Animation for the third cell
import anim4 from '../lottie/shotel.json'; // Animation for the fourth cell

const Motion = () => {
  const lottieRef = useRef(null);
  const containerRef = useRef(null);

  // Refs for all animations
  const tenteRef = useRef(null);
  const anim2Ref = useRef(null);
  const anim3Ref = useRef(null);
  const anim4Ref = useRef(null);

  const [animationProgress, setAnimationProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isTentePlaying, setIsTentePlaying] = useState(false);
  const [isAnim2Playing, setIsAnim2Playing] = useState(false);
  const [isAnim3Playing, setIsAnim3Playing] = useState(false);
  const [isAnim4Playing, setIsAnim4Playing] = useState(false);

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

  // Function to initialize animation to the last frame
  const initializeAnimation = (animationRef) => {
    if (animationRef.current) {
      const lottieInstance = animationRef.current;
      lottieInstance.goToAndStop(lottieInstance.getDuration(true), true);
    }
  };

  // Initialize all animations to their last frame on component mount
  useEffect(() => {
    initializeAnimation(tenteRef);
    initializeAnimation(anim2Ref);
    initializeAnimation(anim3Ref);
    initializeAnimation(anim4Ref);
  }, []);

  // Function to handle click for animations
  const handleAnimationClick = (animationRef, isPlaying, setIsPlaying) => {
    if (animationRef.current && !isPlaying) {
      const lottieInstance = animationRef.current;
      setIsPlaying(true);
      lottieInstance.goToAndStop(0, true); // Go to the start frame
      lottieInstance.play(); // Play the animation
    }
  };

  // Function to handle animation completion
  const handleAnimationComplete = (animationRef, setIsPlaying) => {
    if (animationRef.current) {
      const lottieInstance = animationRef.current;
      lottieInstance.goToAndStop(lottieInstance.getDuration(true), true); // Go to the last frame after playing
      setIsPlaying(false); // Reset playing state
    }
  };

  return (
    <div ref={containerRef} className="relative bg-indigo-950 w-full h-[200vh]">
      <div className="sticky top-0 left-0 z-10 h-screen overflow-hidden">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          className="z-20 w-full mt-4"
          style={{
            clipPath: 'inset(0 0 20% 0)',
            position: 'absolute',
            top: 0,
            height: '80vh',
          }}
        />
      </div>

      <div className="relative z-30 pt-[25vh] h-[100vh]">
        <div className="grid grid-cols-3 grid-rows-2 h-full gap-8 p-8">
          <div className="col-span-2 row-span-1  flex justify-center items-center rounded-lg">
            <Lottie
              lottieRef={anim3Ref}
              animationData={anim3}
              autoplay={false}
              loop={false}
              className="z-20 w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              style={{ clipPath: 'inset(0 0 20% 0)' }}
              onClick={() => handleAnimationClick(anim3Ref, isAnim3Playing, setIsAnim3Playing)}
              onComplete={() => handleAnimationComplete(anim3Ref, setIsAnim3Playing)}
            />
          </div>

          <div className="col-span-1 row-span-2 flex justify-center items-center rounded-lg">
            <Lottie
              lottieRef={tenteRef}
              animationData={tenteAnim}
              autoplay={false}
              loop={false}
              className="z-20 w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              style={{ clipPath: 'inset(0 0 20% 0)' }}
              onClick={() => handleAnimationClick(tenteRef, isTentePlaying, setIsTentePlaying)}
              onComplete={() => handleAnimationComplete(tenteRef, setIsTentePlaying)}
            />
          </div>

          <div className=" flex justify-center items-center rounded-lg">
            <Lottie
              lottieRef={anim2Ref}
              animationData={anim2}
              autoplay={false}
              loop={false}
              className="z-20 w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              style={{ clipPath: 'inset(0 0 20% 0)' }}
              onClick={() => handleAnimationClick(anim2Ref, isAnim2Playing, setIsAnim2Playing)}
              onComplete={() => handleAnimationComplete(anim2Ref, setIsAnim2Playing)}
            />
          </div>

          <div className="flex justify-center items-center rounded-lg">
            <Lottie
              lottieRef={anim4Ref}
              animationData={anim4}
              autoplay={false}
              loop={false}
              className="z-20 w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              style={{ clipPath: 'inset(0 0 20% 0)' }}
              onClick={() => handleAnimationClick(anim4Ref, isAnim4Playing, setIsAnim4Playing)}
              onComplete={() => handleAnimationComplete(anim4Ref, setIsAnim4Playing)}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Motion;
