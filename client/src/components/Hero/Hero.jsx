import "./Hero.css";
import profile from "../../assets/images/harpal.png";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import useSettings from "../../hooks/useSettings";

import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../../animations/variants";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiHtml5,
} from "react-icons/si";

function Hero() {
  const { settings } = useSettings();

  const titles = useMemo(() => {

    return settings?.heroTitles?.length
      ? settings.heroTitles
      : [
        "Full Stack MERN Developer",
        "Web Developer",
        "AI Enthusiast",
        "Problem Solver",
        "Tech Explorer",
      ];

  }, [settings?.heroTitles]);

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {

    setTitleIndex(0);

    setDisplayText("");

    setIsDeleting(false);

  }, [titles]);

  useEffect(() => {
    const currentTitle = titles[titleIndex] || "";

    const speed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentTitle.substring(
          0,
          displayText.length + 1
        );

        setDisplayText(nextText);

        if (nextText === currentTitle) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1200);
        }
      } else {
        const nextText = currentTitle.substring(
          0,
          displayText.length - 1
        );

        setDisplayText(nextText);

        if (nextText === "") {
          setIsDeleting(false);

          setTitleIndex(
            (prev) => (prev + 1) % titles.length
          );
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [
    displayText,
    isDeleting,
    titleIndex,
    titles,
  ]);

  return (
    <section id="home" className="hero">

      {/* Left Side */}

      <motion.div
        className="heroLeft"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >

        <motion.div
          className="badge"
          variants={staggerItem}
        >
          {settings?.heroBadge || "B.Tech CSE Student"}
        </motion.div>

        <motion.h4 variants={fadeLeft}>
          Hi, I'm
        </motion.h4>

        <motion.h1 variants={fadeLeft}>
          {settings?.name || "Harpal Singh"}
        </motion.h1>

        <motion.h3
          className="typingTitle"
          variants={fadeUp}
        >
          {displayText}
          <span className="cursor">|</span>
        </motion.h3>

        <motion.p variants={fadeUp}>
          {settings?.tagline ||
            "I build scalable web applications and love turning ideas into real-world products using the Modern Web Technologies."}
        </motion.p>

        <motion.div
          className="heroButtons"
          variants={staggerContainer}
        >

          <motion.a
            variants={staggerItem}
            href={settings?.resume || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="primaryBtn">
              Download Resume
            </button>
          </motion.a>

          <motion.a
            variants={staggerItem}
            href="#projects"
          >
            <button className="secondaryBtn">
              View My Work
            </button>
          </motion.a>

        </motion.div>

        <motion.div
          className="socialIcons"
          variants={staggerContainer}
        >

          <motion.a
            variants={staggerItem}
            href={settings?.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </motion.a>

          <motion.a
            variants={staggerItem}
            href={settings?.linkedin || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </motion.a>

          <motion.a
            variants={staggerItem}
            href={settings?.instagram || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </motion.a>

          <motion.a
            variants={staggerItem}
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${settings?.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope />
          </motion.a>

        </motion.div>

      </motion.div>

      {/* Right Side */}

      <motion.div
        className="heroRight"
        variants={fadeRight}
        initial="hidden"
        animate="visible"
      >

        <div className="heroCircle">

          <img
            src={settings?.heroImage || profile}
            alt="Harpal Singh"
          />

          <SiReact className="reactIcon floating" />

          <SiHtml5 className="htmlIcon floating" />

          <SiNodedotjs className="nodeIcon floating" />

          <SiMongodb className="mongoIcon floating" />

        </div>

      </motion.div>

    </section>
  );
}

export default Hero;
