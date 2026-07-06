import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService";

function DashboardHome() {

  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    certificates: 0,
    messages: 0,
    unreadMessages: 0,
  });

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats = async () => {

    try {

      const res = await getDashboardStats();

      setStats(res.data.data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="dashboardHome">

      <div className="card">
        <h3>Projects</h3>
        <h1>{stats.projects}</h1>
      </div>

      <div className="card">
        <h3>Skills</h3>
        <h1>{stats.skills}</h1>
      </div>

      <div className="card">
        <h3>Experience</h3>
        <h1>{stats.experiences}</h1>
      </div>

      <div className="card">
        <h3>Certificates</h3>
        <h1>{stats.certificates}</h1>
      </div>

      <div className="card">
        <h3>Messages</h3>
        <h1>{stats.messages}</h1>
      </div>

      <div className="card">
        <h3>Unread Messages</h3>
        <h1>{stats.unreadMessages}</h1>
      </div>

    </div>

  );

}

export default DashboardHome;