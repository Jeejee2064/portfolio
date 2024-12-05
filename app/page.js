import Image from "next/image";
import Hero from './components/Hero'
import ScrollShadow from './components/ScrollShadow'
import WorkSection from './components/WorkSection'
import AboutMe from './components/AboutMe'
import Contact from './components/Contact'
import Navbar from './components/Navbar'

export default function Main() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <section id="works">
        <WorkSection />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}