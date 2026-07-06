import "./Stats.css";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getStats } from "../../api/portfolioApi";

import {
  staggerContainer,
  staggerItem,
} from "../../animations/variants";

import {
  FaCode,
  FaBriefcase,
  FaLaptopCode,
  FaTrophy,
} from "react-icons/fa";

function Stats() {

  const [stats, setStats] = useState({

    projects: "0",

    internships: "0",

    technologies: "0",

    dsaProblems: "0",

  });

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats = async () => {

    try {

      const res = await getStats();

      setStats(res.data.data);

    }

    catch (error) {

      console.error(error);

    }

  };

  const cards = [

    {

      icon:<FaCode />,

      number:stats.projects,

      title:"Projects Completed",

    },

    {

      icon:<FaBriefcase />,

      number:stats.internships,

      title:"Internships",

    },

    {

      icon:<FaLaptopCode />,

      number:stats.technologies,

      title:"Technologies",

    },

    {

      icon:<FaTrophy />,

      number:stats.dsaProblems,

      title:"DSA Problems",

    },

  ];

  return (

    <motion.section

      className="stats"

      variants={staggerContainer}

      initial="hidden"

      whileInView="visible"

      viewport={{

        once:true,

      }}

    >

      {

        cards.map((item,index)=>(

          <motion.div

            className="statCard"

            key={index}

            variants={staggerItem}

            whileHover={{

              y:-8,

              scale:1.03,

            }}

          >

            <div className="statIcon">

              {item.icon}

            </div>

            <h2>

              {item.number}

            </h2>

            <p>

              {item.title}

            </p>

          </motion.div>

        ))

      }

    </motion.section>

  );

}

export default Stats;
