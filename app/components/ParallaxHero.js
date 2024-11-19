'use client'

import { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';
import lottie1 from '../lottie/zig.json';
import lottie2 from '../lottie/wiggle.json';
import lottie3 from '../lottie/bounce.json';
import lottie4 from '../lottie/blacktri.json';
import lottie5 from '../lottie/bluetri.json';
import lottie6 from '../lottie/bounce2.json';


const lottieAnimations = [
  { data: lottie1, speed: Math.random() * 0.16 - 0.08 },
  { data: lottie2, speed: Math.random() * 0.16 - 0.08 },
  { data: lottie3, speed: Math.random() * 0.16 - 0.08 },
  { data: lottie4, speed: Math.random() * 0.16 - 0.08 },
  { data: lottie5, speed: Math.random() * 0.16 - 0.08 },
  { data: lottie6, speed: Math.random() * 0.16 - 0.08 },
];

const ParallaxHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [positions, setPositions] = useState([]);

  // Create individual Lottie refs
  const lottieRef1 = useRef(null);
  const lottieRef2 = useRef(null);
  const lottieRef3 = useRef(null);
  const lottieRef4 = useRef(null);
  const lottieRef5 = useRef(null);
  const lottieRef6 = useRef(null);

  const lottieRefs = [
    lottieRef1,
    lottieRef2,
    lottieRef3,
    lottieRef4,
    lottieRef5,
    lottieRef6
  ];


  useEffect(() => {
    // Generate random positions once on mount
    const initialPositions = lottieAnimations.map(() => ({
      top: `${Math.random() * 75}%`,
      left: `${Math.random() * 75}%`,
    }));
    setPositions(initialPositions);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMouseEnter = (index) => {
    // Play animation using the specific ref
    if (lottieRefs[index].current) {
      lottieRefs[index].current.play();
    }
  };

  const handleMouseLeave = (index) => {
    // Stop animation using the specific ref
    if (lottieRefs[index].current) {
      lottieRefs[index].current.pause();
    }
  };

  return (
    <div className="relative w-screen h-full ">
      <div className=''>
        {lottieAnimations.map((animation, index) => {
          const parallaxEffect = {
            transform: `translate(${(mousePos.x - window.innerWidth / 2) * animation.speed
              }px, ${(mousePos.y - window.innerHeight / 2) * animation.speed
              }px) rotate(${(mousePos.x - window.innerWidth / 2) * animation.speed
              }deg) scale(${1 + (mousePos.x - window.innerWidth / 2) * animation.speed / 100
              })`,
          };

          return (
            <div
              key={index}
              className="absolute w-64 h-64 overflow-hidden"
              style={{ ...positions[index], ...parallaxEffect }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="relative w-full h-full mask-bottom">
                <Lottie
                  animationData={animation.data}
                  loop
                  autoplay={false}
                  lottieRef={lottieRefs[index]}
                  style={{ width: '100%', height: '133%', zIndex: -10 }} // Scale to 133%
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParallaxHero;
