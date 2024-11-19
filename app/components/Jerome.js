'use client'
import { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';
import lottie1 from '../lottie/zig.json';
import lottie2 from '../lottie/wiggle.json';
import lottie3 from '../lottie/mobileN2.json';
import lottie4 from '../lottie/webN2.json';
import lottie5 from '../lottie/motionN2.json';
import lottie6 from '../lottie/bounce2.json';
import transition from '../lottie/transition.json';
import BGSVGShadow from'./BGSVGShadow';


const lottieAnimations = [

  { data1: lottie3, data2: lottie4, speed: Math.random() * 0.8 - 0.04, section: 'apps' },
  { data1: lottie4,data2: lottie5, speed: Math.random() * 0.8 - 0.04, section: 'web' },
  { data1: lottie5, data2: lottie4,speed: Math.random() * 0.8 - 0.04, section: 'motion' },

];

const Jerome = ({ sectionRefs }) => {
  const [isPlaying, setIsPlaying] = useState(Array(lottieAnimations.length).fill(false));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState(0); // 0: not transitioning, 1: covering, 2: scrolling, 3: uncovering
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const lottieRefs = lottieAnimations.map(() => useRef(null));
  const transitionRef = useRef(null);

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

  const handleMouseEnter = (index) => {
    if (!isPlaying[index]) {
      const lottieInstance = lottieRefs[index].current;
      if (lottieInstance) {
        lottieInstance.goToAndPlay(0);
        setIsPlaying(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }
    }
  };

  const handleAnimationComplete = (index) => {
    setIsPlaying(prev => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  const smoothScroll = (targetY, duration) => {
    const startY = window.scrollY;
    const startTime = performance.now();

    const scroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Clamp progress between 0 and 1

      // Easing function: slow down towards the end
      const ease = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, startY + (targetY - startY) * ease);

      if (elapsedTime < duration) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };


  const handleClick = (index) => {
    const section = lottieAnimations[index].section;
    if (section && sectionRefs[section]) {
      setIsTransitioning(true);
      setTransitionPhase(1); // Start covering phase

      // After 0.6s (covering phase), start scrolling
      setTimeout(() => {
        setTransitionPhase(2); // Scrolling phase
        sectionRefs[section].current.scrollIntoView({ behavior: 'auto' });

        // After 0.4s (scrolling phase), start uncovering
        setTimeout(() => {
          setTransitionPhase(3); // Uncovering phase

          // After uncovering phase, start smooth scrolling down
          setTimeout(() => {
            const targetY = window.scrollY + window.innerHeight; // Scroll down 200vh
            smoothScroll(targetY, 1500); // 1.5s for the scroll duration

            // After scrolling completes, reset transition state
            setTimeout(() => {
              setIsTransitioning(false);
              setTransitionPhase(0);
            }, 2500); // 1.5s for the scroll duration
          }, 600); // Ensure this matches the uncovering phase duration
        }, 400); // Ensure this matches the scrolling phase duration
      }, 600); // Ensure this matches the covering phase duration
    }
  };



  return (
    <div className="w-screen min-h-screen max-h-screen flex justify-center items-center bg-indigo-950 overflow-hidden">
    <div className='absolute top-0 left-0'>
<BGSVGShadow/>
</div>
      {isTransitioning && (
        <div className="fixed z-50 w-screen h-screen">
          <Lottie
            animationData={transition}
            loop={false}
            autoplay={true}
            lottieRef={transitionRef}
            className="w-[200vh] h-[200vh] object-cover"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              marginTop: -200,
              animationPlayState: transitionPhase === 2 ? 'paused' : 'running',
              animationDirection: transitionPhase === 3 ? 'reverse' : 'normal',
              clipPath: 'inset(0 0 20% 0)',
            }}
          />
        </div>
      )}
<div className='mt-[10vh] h-[80vh] w-screen flex flex-col overflow-hidden'>
  {lottieAnimations.map((animation, index) => {
    return (
      <div
        key={index}
        className="mb-[-3%]"
        onMouseEnter={() => handleMouseEnter(index)}
        onClick={() => handleClick(index)}
    style={{
    

    overflow: 'hidden'
  }}
      >
        <Lottie
          animationData={animation.data1}
          loop={false}
          autoplay={false}
          lottieRef={lottieRefs[index]}
          className='shadow-lg'
       style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            clipPath: 'inset(0 0 18% 0)',

          }}
          onComplete={() => handleAnimationComplete(index)}
        />
      </div>
    );
  })}
</div>

    </div>
  );
};

export default Jerome;