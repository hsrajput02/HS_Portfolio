import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "./NotFound.css";

function NotFound() {
  return (
    <div className="notFound">

      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Page Not Found
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Sorry, the page you're looking for doesn't exist.
      </motion.p>

      <motion.div
        className="notFoundButtons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/">
          <button>Go Home</button>
        </Link>

        <Link to="/#projects">
          <button className="secondaryBtn">
            View Projects
          </button>
        </Link>
      </motion.div>

    </div>
  );
}

export default NotFound;