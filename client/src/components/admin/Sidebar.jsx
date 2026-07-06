import "./Admin.css";

import { NavLink } from "react-router-dom";

import {

  FaHome,

  FaChartBar,

  FaFolder,

  FaTools,

  FaBriefcase,

  FaCertificate,

  FaCog,

  FaKey

} from "react-icons/fa";

function Sidebar({

  sidebarOpen,

  setSidebarOpen,

}) {

  const closeSidebar = () => {

    setSidebarOpen(false);

  };

  return (

    <aside

      className={`sidebar ${sidebarOpen ? "showSidebar" : ""

        }`}

    >

      <h2>

        Portfolio Admin

      </h2>

      <ul>

        <li>

          <NavLink

            to="/admin"

            onClick={closeSidebar}

          >

            <FaHome />

            Dashboard

          </NavLink>

        </li>

        <li>

          <NavLink

            to="/admin/projects"

            onClick={closeSidebar}

          >

            <FaFolder />

            Projects

          </NavLink>

        </li>

        <li>
          <NavLink

            to="/admin/stats"

            onClick={closeSidebar}

          >

            <FaChartBar />

            Stats

          </NavLink>

        </li>

        <li>

          <NavLink

            to="/admin/skills"

            onClick={closeSidebar}

          >

            <FaTools />

            Skills

          </NavLink>

        </li>

        <li>

          <NavLink

            to="/admin/experience"

            onClick={closeSidebar}

          >

            <FaBriefcase />

            Experience

          </NavLink>

        </li>

        <li>

          <NavLink

            to="/admin/certificates"

            onClick={closeSidebar}

          >

            <FaCertificate />

            Certificates

          </NavLink>

        </li>

        <li>

          <NavLink

            to="/admin/settings"

            onClick={closeSidebar}

          >

            <FaCog />

            MyData Setting

          </NavLink>

        </li>

        <li>
          <NavLink to="/admin/change-password">

            <FaKey />

            <span>Change Password</span>

          </NavLink>
        </li>

      </ul>

    </aside>

  );

}

export default Sidebar;