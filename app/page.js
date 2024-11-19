import Image from "next/image";
import Hero from './components/Hero'
import ScrollShadow from './components/ScrollShadow'
import WorkSection from './components/WorkSection'
import AboutMe from './components/AboutMe'
import Contact from './components/Contact'



export default function Main() {
  return (
    <main className="">
      <Hero />
      
                <WorkSection />

          <AboutMe />
                 <Contact />


    </main>
  );
}