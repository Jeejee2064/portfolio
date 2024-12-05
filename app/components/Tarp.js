'use client'
import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import { useSpring } from '@react-spring/web';
import animationData from '../lottie/Tent.json'; // Ensure this path is correct

const Tarp = () => {
  const lottieRef = useRef(null); // Reference to Lottie animation
  const [currentStep, setCurrentStep] = useState(1); // State to track the current step

  const totalFrames = animationData.op; // Total frames in the animation
  const numSteps = 4; // Total number of steps (including final)

  // Frame positions for each step
  const stepFrames = [
    0, // Step 1
    Math.round(totalFrames * 0.33), // Step 2
    Math.round(totalFrames * 0.66), // Step 3
    totalFrames - 1 // Step 4 (last frame)
  ];

  // Array of messages for each step
  const messages = [
    "Folding diagram.",
    "Secure the back of your tarp by cutting the corners, bring the two front corners to the middle and secure them.",
    "Place your pole inside your tent.",
    "Secure the two sides of your entrance to the back and the center of the entrance to the front."
  ];

  // Spring to animate frame
  const [frameSpring, api] = useSpring(() => ({
    frame: 0,
    config: { tension: 180, friction: 16 }, // Customize the smoothness with these values
  }));

  // Function for smooth frame transition
  const smoothFrameTransition = (targetFrame) => {
    api.start({
      frame: targetFrame,
      onChange: ({ value }) => {
        if (lottieRef.current) {
          lottieRef.current.goToAndStop(value.frame, true);
        }
      },
    });
  };

  // Update the animation and step index
  const updateAnimation = (newStep) => {
    const clampedStep = Math.max(1, Math.min(newStep, numSteps));
    const targetFrame = stepFrames[clampedStep - 1];
    smoothFrameTransition(targetFrame);
    setCurrentStep(clampedStep);
  };

  // Handle Next Button Click
  const handleNext = () => {
    if (currentStep < numSteps) {
      updateAnimation(currentStep + 1);
    }
  };

  // Handle Prev Button Click
  const handlePrev = () => {
    if (currentStep > 1) {
      updateAnimation(currentStep - 1);
    }
  };

  // Get the message for the current step
  const getCurrentMessage = () => messages[currentStep - 1] || "";

  // Determine button disabled states
  const isPrevDisabled = currentStep === 1;
  const isNextDisabled = currentStep === numSteps;

  return (
    <div className="flex flex-col items-center justify-evenly min-h-screen bg-[#0B382C] p-8 ">
      <span className='text-xl text-bold text-center text-white'>Tarp Tent</span>

      <div >
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
          className='lg:w-[400px] bg-white  w-[300px] h-[300px] lg:h-[400px] '
          style={{ overflow: 'hidden', clipPath: 'inset(0 0 15% 0)' }} // Circle with border
        />
      </div>

      <div className="flex items-center space-x-4 ">
        <button
          onClick={handlePrev}
          disabled={isPrevDisabled}
          className={`px-4 py-2 rounded-full border-2 transition transform hover:scale-105 ${isPrevDisabled ? 'bg-gray-500 border-gray-500 text-gray-300 cursor-not-allowed' : 'bg-transparent border-white text-white'}`}
        >
          Prev
        </button>

        <div className="flex-grow text-center">
          <span className="text-lg text-[#FFC107]">{currentStep}</span>
        </div>

        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className={`px-4 py-2 rounded-full border-2 transition transform hover:scale-105 ${isNextDisabled ? 'bg-gray-500 border-gray-500 text-gray-300 cursor-not-allowed' : 'bg-transparent border-white text-white'}`}
        >
          Next
        </button>
      </div>
      <div className="bg-gray-200 p-4 w-[calc(5*4rem+4*1rem)] h-[15vh] text-center mt-2 flex justify-center items-center rounded-lg">
            <span className={` text-[#0b382c]`}>{getCurrentMessage()}</span>
      </div>

    </div>
  );
};

export default Tarp;
