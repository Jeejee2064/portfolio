'use client'
import React, { useState, useEffect } from 'react';
import ParallaxHero from './ParallaxHero'

const ParallaxSVG = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 30;  // Adjust the denominator to control the intensity of the parallax
      const y = (e.clientY - innerHeight / 2) / 30;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-indigo-950 flex justify-center items-center relative overflow-hidden">
            <img
        src="/mwmBlack.svg"
        alt="Shadow SVG"
        className="absolute"
        style={{
          width: 'auto',
          height: '70vh',
          zIndex:'10',
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      />
       <img
        src="/mwm.svg"
        alt="Top SVG"
        className="absolute"
        style={{
        width: 'auto',
        zIndex:'10',
          height: '70vh',
          transform: `translate(0px, 0px)`,
        }}
      />


    </div>
  );
};

export default ParallaxSVG;
