import "./About.css";
import profile from "../../assets/images/harpal.png";

import { motion } from "framer-motion";

import {
  FaUser,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaEnvelope,
  FaFilePdf,
} from "react-icons/fa";

import useSettings from "../../hooks/useSettings";

import {
  fadeLeft,
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../../animations/variants";

function About() {

  const { settings } = useSettings();

  const info = [

    {
      icon: <FaUser />,
      label: "Name",
      value:
        settings?.name ||
        "Harpal Singh",
    },

    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value:
        settings?.location ||
        "Greater Noida, India",
    },

    {
      icon: <FaGraduationCap />,
      label: "Education",
      value:
        settings?.education ||
        "B.Tech CSE (2023-2027)",
    },

    {
      icon: <FaEnvelope />,
      label: "Email",
      value:
        settings?.email ||
        "hsrajput38108@gmail.com",
    },

  ];

  return (

    <section
      id="about"
      className="about"
    >

      <motion.h2

        className="sectionTitle"

        variants={fadeUp}

        initial="hidden"

        whileInView="visible"

        viewport={{
          once: true,
          amount: 0.3,
        }}

      >

        About Me

      </motion.h2>

      <div className="aboutContainer">

        {/* Left Image */}

        <motion.div

          className="aboutImage"

          variants={fadeLeft}

          initial="hidden"

          whileInView="visible"

          viewport={{
            once: true,
            amount: 0.3,
          }}

        >

          <img

            src={settings?.heroImage || profile}

            alt="Harpal Singh"

          />

        </motion.div>

        {/* Right Content */}

        <motion.div

          className="aboutContent"

          variants={staggerContainer}

          initial="hidden"

          whileInView="visible"

          viewport={{
            once: true,
            amount: 0.2,
          }}

        >

          <motion.p
            variants={staggerItem}
          >

            {

              settings?.about ||

              "I'm a passionate Full Stack MERN Developer currently pursuing B.Tech in Computer Science. I enjoy building modern web applications, solving real-world problems, and continuously learning new technologies."

            }

          </motion.p>

          <motion.div

            className="aboutInfo"

            variants={staggerContainer}

          >

            {

              info.map((item) => (

                <motion.div

                  key={item.label}

                  className="infoItem"

                  variants={staggerItem}

                  whileHover={{

                    y: -8,

                    scale: 1.03,

                  }}

                  transition={{

                    duration: 0.25,

                  }}

                >

                  {item.icon}

                  <span>

                    {item.label}

                  </span>

                  <strong>

                    {item.value}

                  </strong>

                </motion.div>

              ))

            }

          </motion.div>

          <motion.a

            variants={staggerItem}

            href={settings?.resume || "#"}

            target="_blank"

            rel="noopener noreferrer"

          >

            <button className="resumeBtn">

              <FaFilePdf />

              View My Resume

            </button>

          </motion.a>

        </motion.div>

      </div>

    </section>

  );

}

export default About;