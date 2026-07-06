import "./Navbar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import {
  navbarVariant,
  staggerContainer,
  staggerItem,
} from "../../animations/variants";

function Navbar() {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "auto";

    return () => {

      document.body.style.overflow = "auto";

    };

  }, [menuOpen]);

  // Close using ESC
  useEffect(() => {

    const handleEsc = (e) => {

      if (e.key === "Escape") {

        setMenuOpen(false);

      }

    };

    window.addEventListener(
      "keydown",
      handleEsc
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleEsc
      );

    };

  }, []);

  // Navbar glass effect
  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 40);

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);

  const closeMenu = () => {

    setMenuOpen(false);

  };

  return (

    <>

      <motion.nav

        variants={navbarVariant}

        initial="hidden"

        animate="visible"

        className={`navbar ${scrolled
            ? "navbarScrolled"
            : ""

          }`}

      >

        {/* Logo */}

        <motion.div

          className="logo"

          whileHover={{
            scale: 1.05,
          }}

        >
          

          <a href="/">
          <div className="logoBox">
            HS
          </div>
</a>
          
          <h2> Harpal <span>Singh</span> </h2>

        </motion.div>

        {/* Desktop Navigation */}

        <ul className="navLinks">

          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#certifications">Certificates</a></li>
          <li><a href="#contact">Contact</a></li>

        </ul>

        {/* Desktop Login */}

        <motion.button className="loginBtn"
          whileHover={{
            scale: 1.05,
            y: -2
          }}

          whileTap={{
            scale: .96
          }}

          onClick={() =>

            navigate("/admin/login")

          }

        >
          Admin Login
        </motion.button>

        {/* Hamburger */}

        <button

          className="menuIcon"

          onClick={() =>

            setMenuOpen(!menuOpen)

          }

        >

          {

            menuOpen

              ? <FaTimes />

              : <FaBars />

          }

        </button>

      </motion.nav>

      {/* .
          Overlay + Mobile Drawer
      . */}

      <AnimatePresence>

        {

          menuOpen && (

            <>

              {/* Overlay */}

              <motion.div

                className="mobileOverlay"

                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

                exit={{ opacity: 0 }}

                transition={{ duration: .3 }}

                onClick={closeMenu}

              />

              {/* Drawer */}

              <motion.aside

                className="mobileMenu"

                initial={{ x: "100%" }}

                animate={{ x: 0 }}

                exit={{ x: "100%" }}

                transition={{

                  duration: .35,

                  ease: "easeInOut",

                }}

              >
                <button
                  className="drawerClose"
                  onClick={closeMenu}
                >
                  <FaTimes />
                </button>

                <motion.div

                  className="mobileLinks"

                  variants={staggerContainer}

                  initial="hidden"

                  animate="visible"

                >

                  {

                    [

                      ["Home", "#home"],

                      ["About", "#about"],

                      ["Projects", "#projects"],

                      ["Experience", "#experience"],

                      ["Certificates", "#certifications"],

                      ["Contact", "#contact"],

                    ].map(([title, link]) => (

                      <motion.a

                        key={title}

                        href={link}

                        variants={staggerItem}

                        onClick={closeMenu}

                      >

                        {title}

                      </motion.a>

                    ))

                  }

                  <motion.button

                    className="loginBtn1"

                    variants={staggerItem}

                    onClick={() => {

                      closeMenu();

                      navigate("/admin/login");

                    }}

                  >

                    Admin Login

                  </motion.button>

                </motion.div>

              </motion.aside>

            </>

          )

        }

      </AnimatePresence>

    </>

  );

}

export default Navbar;