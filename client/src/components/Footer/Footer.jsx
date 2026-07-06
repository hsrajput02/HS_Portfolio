import "./Footer.css";

import { motion } from "framer-motion";

import {
  FaGithub,
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa6";

import useSettings from "../../hooks/useSettings";

import { fadeUp } from "../../animations/variants";

function Footer() {

  const { settings } = useSettings();

  const scrollToTop = () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  return (

    <motion.footer

      className="footer"

      variants={fadeUp}

      initial="hidden"

      whileInView="visible"

      viewport={{

        once: true,

        amount: .2,

      }}

    >

      <div className="footerContent">

        <h2>

          {settings?.name || "Harpal Singh"}

        </h2>

         <p>
                {settings?.footerTagline ||
                    "Full Stack MERN Developer • AI Enthusiast • Google Student Ambassador"}
            </p>

        <div className="footerSocial">

          <motion.a

            whileHover={{

              y: -4,

              scale: 1.12,

            }}

            href={settings?.github || "#"}

            target="_blank"

            rel="noopener noreferrer"

          >

            <FaGithub />

          </motion.a>

          <motion.a

            whileHover={{

              y: -4,

              scale: 1.12,

            }}

            href={settings?.linkedin || "#"}

            target="_blank"

            rel="noopener noreferrer"

          >

            <FaLinkedin />

          </motion.a>

          <motion.a



            whileHover={{

              scale: 1.15,

              y: -4,

            }}

            href={`https://wa.me/${settings?.whatsapp || "7827170168"}`}

            target="_blank"

            rel="noopener noreferrer"

          >

            <FaWhatsapp />

          </motion.a>

          <motion.a

            whileHover={{

              y: -4,

              scale: 1.12,

            }}

            href={settings?.instagram || "#"}

            target="_blank"

            rel="noopener noreferrer"

          >

            <FaInstagram />

          </motion.a>

        </div>

        <small>

          © {new Date().getFullYear()}{" "}

          {settings?.name || "Harpal Singh"}.

          All Rights Reserved.

        </small>

      </div>

      <motion.button

        className="scrollTop"

        whileHover={{

          scale: 1.08,

          y: -3,

        }}

        whileTap={{

          scale: .95,

        }}

        onClick={scrollToTop}

      >

        <FaArrowUp />

      </motion.button>

    </motion.footer>

  );

}

export default Footer;
