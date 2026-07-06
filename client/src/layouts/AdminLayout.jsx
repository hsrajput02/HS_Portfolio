import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

import "../components/admin/Admin.css";

function AdminLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="dashboard">

      <Sidebar

        sidebarOpen={sidebarOpen}

        setSidebarOpen={setSidebarOpen}

      />

      {

        sidebarOpen && (

          <div

            className="sidebarOverlay"

            onClick={() =>
              setSidebarOpen(false)
            }

          />

        )

      }

      <div className="mainContent">

        <Topbar

          setSidebarOpen={setSidebarOpen}

        />

        <Outlet />

      </div>

    </div>

  );

}

export default AdminLayout;