import "./Admin.css";

import { FaBars, FaEnvelope } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

function Topbar({

  setSidebarOpen,

}) {

  const navigate = useNavigate();

  const {

    notification,

    showNotification,

  } = useNotification();

  const handleLogout = () => {

    localStorage.removeItem("token");

    showNotification(

      "Logged out successfully!",

      "success"

    );

    navigate("/", {

      replace: true,

    });

  };

  return (

    <>

      <div className="topbar">

        <div className="topbarLeft">

          <button

            className="menuBtn"

            onClick={() =>
              setSidebarOpen(true)
            }

          >

            <FaBars />

          </button>

          <h2>

            Admin Dashboard

          </h2>

        </div>

        <div className="msgNLogout">

          <button
            onClick={() => navigate('/admin/messages')}
          >
            <FaEnvelope />

          </button>

          <button

            onClick={handleLogout}

          >

            Logout

          </button>

        </div>

      </div>

      <Notification

        visible={notification.visible}

        message={notification.message}

        type={notification.type}

      />

    </>

  );

}

export default Topbar;