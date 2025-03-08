'use client'
import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from '../lottie/PapillonBoucle.json';
import { useSpring, animated } from '@react-spring/web';
import { Range, getTrackBackground } from 'react-range';
import { motion, AnimatePresence } from 'framer-motion';

const Knots = () => {
  const lottieRef = useRef(null);
  const modalLottieRef = useRef(null);
  const [text, setText] = useState('Make a loop, note the working end goes over the standing part.');
  const [sliderValue, setSliderValue] = useState([0]);
  const [activeButton, setActiveButton] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalFrames = animationData.op;

  const messages = [
    "Make a loop, note the working end goes over the standing part.",
    "Twist the loop on itself to make an 8 (pay attention to the direction).",
    "Pass the upper part of the loop over the lower part, the working end, and the standing part.",
    "Pass the loop through the central opening from underneath.",
    "Tighten while holding the loop and pulling on both ends."
  ];

  const stepValues = Array.from({ length: 5 }, (_, i) => Math.round((i / 4) * totalFrames));

  const findNearestStep = (value) => {
    const nearestStep = stepValues.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
    return stepValues.indexOf(nearestStep);
  };

  const [frameSpring, api] = useSpring(() => ({
    frame: 0,
    config: { tension: 180, friction: 16 },
  }));

  const smoothFrameTransition = (targetFrame) => {
    api.start({
      frame: targetFrame,
      onChange: ({ value }) => {
        if (lottieRef.current) {
          const animationDuration = lottieRef.current.getDuration(true);
          lottieRef.current.goToAndStop((value.frame / totalFrames) * animationDuration, true);
        }
        setSliderValue([value.frame]);
      },
    });
  };

  const handleSliderChange = (values) => {
    const newValue = values[0];
    setSliderValue([newValue]);
    if (lottieRef.current) {
      const animationDuration = lottieRef.current.getDuration(true);
      lottieRef.current.goToAndStop((newValue / totalFrames) * animationDuration, true);
    }
  };

  const handleSliderFinalChange = (values) => {
    const newValue = values[0];
    const nearestStepIndex = findNearestStep(newValue);
    setText(messages[nearestStepIndex]);
    setActiveButton(nearestStepIndex);
  };

  const handleButtonClick = (percentage, buttonIndex) => {
    const targetFrame = stepValues[buttonIndex];
    smoothFrameTransition(targetFrame);
    setText(messages[buttonIndex]);
    setActiveButton(buttonIndex);
  };

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true);
    }
  }, []);

  // Effect to play the modal Lottie animation with delay when modal opens
  useEffect(() => {
    if (isModalOpen && modalLottieRef.current) {
      const timer = setTimeout(() => {
        modalLottieRef.current.goToAndPlay(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <div className="flex flex-col items-center justify-center aspect-w-9 aspect-h-16 bg-[#283061] rounded-lg">
      <span className='text-xl text-bold mb-2 text-white'>Alpine Butterfly</span>
      <div className="relative bg-white" style={{ borderRadius: '50%', border: '8px solid #FFC107' }}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
          className='lg:w-[400px] lg:h-[400px] w-[40vh] h-[40vh]'
          style={{ overflow: 'hidden', clipPath: 'inset(0 0 15% 0)' }}
        />
      </div>

      <div className="w-64 mt-4">
        <Range
          values={sliderValue}
          step={1}
          min={0}
          max={totalFrames}
          onChange={handleSliderChange}
          onFinalChange={handleSliderFinalChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '10px',
                background: getTrackBackground({
                  values: sliderValue,
                  colors: ['#ffc107', '#D1D5DB'],
                  min: 0,
                  max: totalFrames,
                }),
                borderRadius: '4px',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '40px',
                width: '40px',
                backgroundColor: '#FFFFFF',
                border: '4px solid #FFC107',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
              }}
            />
          )}
        />
      </div>

      <div className="flex space-x-4 mt-6">
        {[0, 25, 50, 75, 100].map((percentage, index) => (
          <motion.button
            key={index}
            onClick={() => handleButtonClick(percentage, index)}
            className={`px-3 py-1 rounded-full border-2 border-white transition bg-transparent`}
            style={{
              scale: activeButton === index ? 1.2 : 1,
              transition: 'transform 0.3s ease-in-out',
              color: activeButton === index ? '#FFC107' : 'white',
            }}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>

      <div className="my-4 w-full flex justify-center items-center text-center">
        <div className="bg-gray-200 p-4 w-4/5 h-24 text-center items-center flex rounded-lg">
          <span className="text-md text-[#283061]">{text}</span>
        </div>
      </div>

      {/* Use & Features Button */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-6 py-2 bg-[#FFC107] text-[#283061] rounded-lg font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Use & Features
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 h- screen flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-[#283061] p-8 rounded-lg  overflow-y-auto"
            >
              <div className="mx-auto flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                {/* Left Section: Title and Lottie Animation */}
                <div className="flex flex-col items-center justify-center space-y-2 md:w-1/2">
                  <span className="text-xl font-bold mb-2  text-center text-white">
                    Alpine Butterfly
                  </span>
                  <div className="flex items-center justify-center bg-white rounded-full border-[#ffc107] border-8 p-4">
                    <Lottie
                      lottieRef={modalLottieRef}
                      animationData={animationData}
                      autoplay={false}
                      loop={false}
                      className="h-[20vh] w-[20vh] md:h-[50vh] md:w-[50vh]"
                      style={{ clipPath: 'inset(0 0 20% 0)' }}
                    />
                  </div>
                </div>

                {/* Right Section: Text Content and Button */}
                <div className="flex flex-col space-y-4 md:w-1/2">
                  {/* Uses Section */}
                  <div className="rounded-lg">
                    <h3 className="text-l font-semibold text-[#FFC107] mb-1">Uses</h3>
                    <ul className="list-inside text-white text-sm">
                      <li>Creating a secure loop in the middle of a rope.</li>
                      <li>Isolating damaged sections of rope.</li>
                    </ul>
                  </div>

                  {/* Characteristics Section */}
                  <div className="rounded-lg">
                    <h3 className="text-l font-semibold text-[#FFC107] mb-1">Characteristics</h3>
                    <ul className="list-inside text-white text-sm">
                      <li>Non-binding under load - easily untied after use.</li>
                      <li>Maintains approximately 70% of rope strength.</li>
                    </ul>
                  </div>

                  {/* Advice Section */}
                  <div className="rounded-lg">
                    <h3 className="text-l font-semibold text-[#FFC107] mb-1">Advice</h3>
                    <ul className="list-inside text-white text-sm">
                      <li>Always twist the rope twice in the same direction when making the '8' (step 2).</li>
                    </ul>
                  </div>

                  {/* Close Button */}
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-2 w-full px-6 py-3 bg-[#FFC107] text-[#283061] rounded-lg font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Knots;