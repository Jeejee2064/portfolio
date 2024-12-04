'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const colorSets = [
  ['#FA5D66', '#FFA1C5', '#ffdb40'], // Set 1
    ['#FA5D66', '#FFA1C5', '#ffdb40'], 
   ['#FA5D66', '#FFA1C5', '#ffdb40'], 
];

const svgPaths = [
  { id: 'shape1', d: "M10,10 h50 v50 h-50 Z", viewBox: "0 0 70 70", type: 'fill' },
  { id: 'shape2', d: "M0,0 L50,0 L25,50 Z", viewBox: "0 0 50 50", type: 'fill' },
  { id: 'shape3', d: "M25,0 A25,25 0 1,1 25,50 A25,25 0 1,1 25,0", viewBox: "0 0 50 50", type: 'stroke', strokeWidth: 10 },
  { id: 'shape4', d: "M4.5453275,46.735056 C 0,0 11.1381155,0.575427 16.1881245,-8.725248 C 25.783461,28.709132 19.23203,18.020309 24.947059,11.009615 30.662088,3.9989205 46.043064,5.9738423 46.043064,5.9738423", viewBox: "0 0 50 50", type: 'stroke', strokeWidth: 10 },
  { id: 'shape5', d: "M0,0 Q25,50 50,0 T100,0", viewBox: "0 0 100 50", type: 'stroke', strokeWidth: 13 },
  { id: 'shape6', d: "M25,0 A25,25 0 1,1 25,50 A25,25 0 1,1 25,0", viewBox: "0 0 50 50", type: 'fill' },
];

const ShapeWithMotion = ({ shape, index, scrollYProgress, mousePosition, onAnimationComplete, totalShapes }) => {
  const x = useTransform(scrollYProgress, [0, 1], [0, shape.moveDistance]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]); // Adjust the fade-out range

  const shadowOffset = {
    x: -((mousePosition.x - shape.x) / 30) * Math.min(
      Math.sqrt(Math.pow(mousePosition.x - shape.x, 2) + Math.pow(mousePosition.y - shape.y, 2)) / 300,
      1
    ),
    y: -((mousePosition.y - shape.y) / 30) * Math.min(
      Math.sqrt(Math.pow(mousePosition.x - shape.x, 2) + Math.pow(mousePosition.y - shape.y, 2)) / 300,
      1
    ),
  };

  const renderPath = (isShadow = false) => {
    const commonProps = {
      d: shape.d,
      transform: `translate(${shape.x}, ${shape.y}) scale(${shape.scale}) rotate(${shape.rotation})`,
    };

    if (isShadow) {
      return (
        <path
          {...commonProps}
          fill={shape.type === 'fill' ? 'black' : 'none'}
          stroke={shape.type === 'stroke' ? 'black' : 'none'}
          strokeWidth={shape.type === 'stroke' ? shape.strokeWidth : undefined}
          opacity="0.4"
        />
      );
    }

    return (
      <path
        {...commonProps}
        fill={shape.type === 'fill' ? shape.color : 'none'}
        stroke={shape.type === 'stroke' ? shape.color : 'none'}
        strokeWidth={shape.type === 'stroke' ? shape.strokeWidth : undefined}
      />
    );
  };

  return (
    <motion.g
      key={shape.uniqueId}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      style={{ x, opacity }} // Apply opacity transformation
      onAnimationComplete={index === totalShapes - 1 ? onAnimationComplete : undefined}
    >
      <g transform={`translate(${shadowOffset.x * 0.3}, ${shadowOffset.y})`} style={{ zIndex: 10 }}>
        {renderPath(true)}
      </g>
      <g transform={`translate(${shadowOffset.x * -0.6}, ${shadowOffset.y * 0.4})`} style={{ zIndex: 20 }}>
        {renderPath()}
      </g>
    </motion.g>
  );
};

const BGSVGShadow2 = ({ onAnimationComplete }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [shapes, setShapes] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      generateShapes();
    }
  }, [dimensions]);

  const doesOverlap = (shape1, shape2) => {
    const buffer = 0.05;
    const distX = shape1.x - shape2.x;
    const distY = shape1.y - shape2.y;
    const distance = Math.sqrt(distX * distX + distY * distY);
    const shape1Size = (shape1.scale * shape1.width) / 2;
    const shape2Size = (shape2.scale * shape2.width) / 2;
    const minDistance = shape1Size + shape2Size;
    return distance < minDistance * (1 - buffer);
  };

  const generateShapes = () => {
  const newShapes = [];
const idealAspectRatio = 16 / 9;
const actualAspectRatio = dimensions.width / dimensions.height;
const ratioAdjustment = Math.max(1, idealAspectRatio / actualAspectRatio);
const shapeCount = Math.floor(dimensions.width * dimensions.height / (40000 / ratioAdjustment));
const colorSet = colorSets[Math.floor(Math.random() * colorSets.length)];

    for (let i = 0; i < shapeCount; i++) {
      let placed = false;
      let attempt = 0;

      while (!placed && attempt < 100) {
        const randomShape = svgPaths[Math.floor(Math.random() * svgPaths.length)];
        const scale = Math.random() * 0.5 + 1;
        const x = Math.random() * dimensions.width;
        const y = Math.random() * dimensions.height;
        const rotation = Math.random() * 360;
        const color = colorSet[Math.floor(Math.random() * colorSet.length)];
        const direction = Math.random() < 0.5 ? -1 : 1;
        const moveDistance = direction * (Math.random() * 1000 + 500);

        const newShape = {
          ...randomShape,
          uniqueId: `${randomShape.id}-${i}`,
          x,
          y,
          scale,
          rotation,
          color,
          width: parseFloat(randomShape.viewBox.split(' ')[2]) * scale,
          moveDistance
        };

        const hasOverlap = newShapes.some((existingShape) => doesOverlap(existingShape, newShape));

        if (!hasOverlap) {
          newShapes.push(newShape);
          placed = true;
        } else {
          attempt++;
        }
      }
    }

    setShapes(newShapes);
  };

  return (
    <div ref={sectionRef} className="h-screen w-screen absolute overflow-visible z-[0]">
      <svg width="100%" viewBox="0 0 500 500" style={{ overflow: 'visible' }}>
        {shapes.map((shape, index) => (
          <ShapeWithMotion
            key={shape.uniqueId}
            shape={shape}
            index={index}
            scrollYProgress={scrollYProgress}
            mousePosition={mousePosition}
            onAnimationComplete={onAnimationComplete}
            totalShapes={shapes.length}
          />
        ))}
      </svg>
    </div>
  );
};

export default BGSVGShadow2;