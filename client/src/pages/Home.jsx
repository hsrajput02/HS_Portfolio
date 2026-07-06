import React from "react";
import Hero from "../components/Hero/Hero";
import Stats from "../components/Stats/Stats";
import Skills from "../components/Skills/Skills";
import Projects from "../components/Projects/Projects";
import Experience from "../components/Experience/Experience";
import Certifications from "../components/Certifications/Certifications";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;