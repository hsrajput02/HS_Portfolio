import "./Projects.css";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { getProjects } from "../../api/portfolioApi";
import Loader from "../common/Loader";

import {
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../../animations/variants";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    loadProjects();

  }, []);

  const loadProjects = async () => {

    try {

      setLoading(true);

      const res = await getProjects();

      setProjects(res.data.data);

    }

    catch (err) {

      console.error(err);

      setError("Failed to load projects.");

    }

    finally {

      setLoading(false);

    }

  };

  const featuredProjects = projects.filter(

    (project) => project.featured

  );

  return (

    <section
      id="projects"
      className="projects"
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

        Featured Projects

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
        featuredProjects.length === 0 && (

          <p className="statusMessage">

            No featured projects available.

          </p>

        )

      }

      {

        !loading &&
        !error &&
        featuredProjects.length > 0 && (

          <motion.div

            className="projectGrid"

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{

              once: true,

              amount: .2,

            }}

          >

            {

              featuredProjects.map((project) => (

                <motion.div

                  key={project._id}

                  className="projectCard"

                  variants={staggerItem}

                  whileHover={{

                    y: -12,

                    scale: 1.02,

                  }}

                >

                  <div className="projectImage">

                    <img

                      src={project.image}

                      alt={project.title}

                    />

                    <div className="imageOverlay" />

                  </div>

                  <div className="projectContent">

                    <h3>

                      {project.title}

                    </h3>

                    <p>

                      {project.description}

                    </p>

                    <motion.div

                      className="techStack"

                      variants={staggerContainer}

                    >

                      {

                        project.technologies?.map(

                          (tech, index) => (

                            <motion.span

                              key={index}

                              variants={staggerItem}

                              whileHover={{

                                scale: 1.08,

                              }}

                            >

                              {tech}

                            </motion.span>

                          )

                        )

                      }

                    </motion.div>

                    <div className="projectButtons">

                      {project.liveDemo ? (

                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >

                          <button>
                            Live Demo
                          </button>

                        </a>

                      ) : (

                        <button
                          className="disabledBtn"
                          disabled
                        >
                          Live Demo
                        </button>

                      )}

                      {

                        project.github && (

                          <a

                            href={project.github}

                            target="_blank"

                            rel="noopener noreferrer"

                          >

                            <button>

                              GitHub

                            </button>

                          </a>

                        )

                      }

                    </div>

                  </div>

                </motion.div>

              ))

            }

          </motion.div>

        )

      }

    </section>

  );

}

export default Projects;
