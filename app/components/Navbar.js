'use client';
import React, { useState, useEffect, useRef } from 'react';
import localFont from 'next/font/local';

const neon = localFont({
  src: '../Neon.ttf', // Adjust the path accordingly
});

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (sectionId) => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const element = document.getElementById(sectionId);
    if (!element) return;

    // Set active section
    setActiveSection(sectionId);

    // Check screen size
    const isSmallScreen = window.innerWidth < 640;

    // Get the element's position relative to the viewport
    const rect = element.getBoundingClientRect();
    const absoluteElementTop = rect.top + window.pageYOffset;
    const viewportHeight = window.innerHeight;

    // Calculate positions
    const finalScrollPosition = absoluteElementTop + viewportHeight * (isSmallScreen ? 0.5 : 1);
    const initialScrollPosition = finalScrollPosition - viewportHeight * (isSmallScreen ? 0.8 : 1.3);

    // Step 1: Instantly jump to the initial position
    window.scrollTo({
      top: initialScrollPosition,
      behavior: 'auto',
    });

    // Step 2: Smooth scroll to the final position with animation
    setTimeout(() => {
      smoothScrollTo(finalScrollPosition, 2000);
    }, 50);
  };

  // Smooth scrolling function with easing
  const smoothScrollTo = (targetPosition, duration) => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    const start = window.pageYOffset;
    const distance = targetPosition - start;
    const startTime = performance.now();

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const step = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const ease = easeInOutQuad(progress);
      window.scrollTo(0, start + distance * ease);

      if (elapsedTime < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className={`${neon.className} bg-gradient-to-b from-gray-800/70 to-transparent`}>
        <div className="mx-auto px-4">
          <div className="flex items-center justify-center h-16 gap-8">
            {[
              { id: 'works', label: 'Works' },
              { id: 'about', label: 'About Me' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-xl text-white font-medium transition-colors hover:text-blue-600 ${
                  activeSection === item.id ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;