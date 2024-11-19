'use client'
import { useRef } from 'react';
import Jerome from './Jerome';
import Apps from './Apps';
import Motion from './Motion';
import Web from './Web';
import BGSVGShadow from'./BGSVGShadow';

export default function Home() {
  // Create refs for each section
  const appsRef = useRef(null);
  const webRef = useRef(null);
  const motionRef = useRef(null);

  const sectionRefs = {
    apps: appsRef,
    web: webRef,
    motion: motionRef,
  };

  return (
    <main className="min-h-screen w-screen">
      <Jerome sectionRefs={sectionRefs} />
      <div ref={appsRef}><Apps /></div>
      <div ref={webRef}><Web /></div>
      <div ref={motionRef}><Motion /></div>
    </main>
  );
}
