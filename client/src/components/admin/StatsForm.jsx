import { useEffect, useState } from "react";

import AdminForm from "./common/AdminForm";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

import {
  getStats,
  updateStats,
} from "../../api/portfolioApi";

function StatsForm() {

  const [stats, setStats] = useState({

    projects: "",

    internships: "",

    technologies: "",

    dsaProblems: "",

  });

  const [loading, setLoading] = useState(false);

  const {

    notification,

    showNotification,

  } = useNotification();

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

  const handleChange = (e) => {

    setStats({

      ...stats,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await updateStats({

        projects: stats.projects,

        internships: stats.internships,

        technologies: stats.technologies,

        dsaProblems: stats.dsaProblems,

      });

      showNotification(

        "Stats updated successfully!",

        "success"

      );

      loadStats();

    }

    catch (error) {

      console.error(error);

      showNotification(

        "Failed to update stats.",

        "error"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <>

      <AdminForm

        title="Stats"

        onSubmit={handleSubmit}

        buttonText="Save Stats"

        loading={loading}

        loadingText="Saving..."

      >

        <label className="formLabel">
          Projects Completed
        </label>
        <input

          name="projects"

          placeholder="Projects Completed"

          value={stats.projects || ""}

          onChange={handleChange}

        />

        <label className="formLabel">
          Internships
          </label>

        <input

          name="internships"

          placeholder="Internships"

          value={stats.internships || ""}

          onChange={handleChange}

        />

        <label className="formLabel">
          Technologies
        </label>
        <input

          name="technologies"

          placeholder="Technologies"

          value={stats.technologies || ""}

          onChange={handleChange}

        />


        <label className="formLabel">
          DSA Problems
        </label>
        <input

          name="dsaProblems"

          placeholder="DSA Problems"

          value={stats.dsaProblems || ""}

          onChange={handleChange}

        />

      </AdminForm>

      <Notification

        visible={notification.visible}

        message={notification.message}

        type={notification.type}

      />

    </>

  );

}

export default StatsForm;