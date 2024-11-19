'use client'

import React, { useState } from 'react';
import { Lottie } from 'lottie-react';
import animationData from '../lottie/apps2.json'; // Ensure this path is correct

const Lottie = () => {
  const [frame, setFrame] = useState(0); // Slider frame position

  const totalFrames = animationData.op; // Get total frames from Lottie animation

  // Slider event handler
  const handleSliderChange = (e) => {
    setFrame(Number(e.target.value));
  };

  return (
    <div className="flex flex-col items-center">
      <Lottie
        animationData={animationData}
        play
        segments={[frame, frame + 1]} // Set the animation to show a single frame
        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
      />
      <input
        type="range"
        min="0"
        max={totalFrames}
        value={frame}
        onChange={handleSliderChange}
        className="mt-4 w-64" // Tailwind classes for styling
      />
    </div>
  );
};

export default Lottie;
