import "./Experience.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Loader from "../common/Loader";
import { getExperiences } from "../../api/portfolioApi";

import {
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../../animations/variants";

function Experience() {

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {

    try {

      setLoading(true);

      const res = await getExperiences();

      setExperiences(res.data.data);

    }

    catch (err) {

      console.error(err);

      setError("Failed to load experience.");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <section
      id="experience"
      className="experience"
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

        Experience

      </motion.h2>

      {loading && <Loader />}

      {

        error && (

          <p className="statusMessage error">

            {error}

          </p>

        )

      }

      {

        !loading &&
        !error &&
        experiences.length === 0 && (

          <p className="statusMessage">

            No experience available.

          </p>

        )

      }

      {

        !loading &&
        !error &&
        experiences.length > 0 && (

          <motion.div

            className="timeline"

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{
              once: true,
              amount: .2,
            }}

          >

            {

              experiences.map((item) => (

                <motion.div

                  key={item._id}

                  className="timelineItem"

                  variants={staggerItem}

                >

                  <div className="timelineCircle"></div>

                  <motion.div

                    className="timelineContent"

                    whileHover={{
                      x: 8,
                      y: -4,
                    }}

                  >

                    {

                      item.logo && (

                        <img

                          src={item.logo}

                          alt={item.company}

                          className="experienceLogo"

                        />

                      )

                    }

                    <h3>

                      {item.role}

                    </h3>

                    <h4>

                      {item.company}

                    </h4>

                    <span className="durationBadge">

                      {item.duration}

                    </span>

                    <p>

                      {item.description}

                    </p>

                  </motion.div>

                </motion.div>

              ))

            }

          </motion.div>

        )

      }

    </section>

  );

}

export default Experience;
