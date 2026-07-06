import "./Skills.css";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { getSkills } from "../../api/portfolioApi";
import iconMap from "../../utils/iconMap";

import {
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../../animations/variants";

function Skills() {

  const [skills, setSkills] = useState([]);

  useEffect(() => {

    const loadSkills = async () => {

      try {

        const res = await getSkills();

        setSkills(res.data.data);

      }

      catch (error) {

        console.error(error);

      }

    };

    loadSkills();

  }, []);

  return (

    <section
      id="skills"
      className="skillsSection"
    >

      <motion.h2

        className="sectionTitle"

        variants={fadeUp}

        initial="hidden"

        whileInView="visible"

        viewport={{
          once: true,
          amount: .3,
        }}

      >

        Skills

      </motion.h2>



      <motion.div

        className="skillsGrid"

        variants={staggerContainer}

        initial="hidden"

        whileInView="visible"

        viewport={{
          once: true,
          amount: .2,
        }}

      >

        {

          skills.map((skill) => {

            const Icon = iconMap[skill.icon];

            return (

              <motion.div

                key={skill._id}

                className="skillCard"

                variants={staggerItem}

                whileHover={{
                  y: -8,
                  scale: 1.05,
                }}

              >

                {

                  Icon && (

                    <motion.div

                      whileHover={{
                        rotate: 12,
                        scale: 1.15,
                      }}

                    >

                      <Icon className="skillIcon" />

                    </motion.div>

                  )

                }

                <h3 className="skillName">

                  {skill.name}

                </h3>

              </motion.div>

            );

          })

        }

      </motion.div>


    </section>

  );

}

export default Skills;