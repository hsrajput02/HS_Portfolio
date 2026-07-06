import { useState } from "react";

import DataTable from "./common/DataTable";
import ConfirmModal from "../common/ConfirmModal";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

import { deleteExperience } from "../../services/experienceService";

function ExperienceTable({
  experiences,
  refresh,
  onEdit,
}) {

  const [showModal, setShowModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [loading, setLoading] = useState(false);

  const {
    notification,
    showNotification,
  } = useNotification();

  const handleDeleteClick = (id) => {

    setDeleteId(id);

    setShowModal(true);

  };

  const confirmDelete = async () => {

    setLoading(true);

    try {

      await deleteExperience(deleteId);

      showNotification(
        "Experience deleted successfully!",
        "success"
      );

      refresh();

    }

    catch (error) {

      console.error(error);

      showNotification(
        error.response?.data?.message ||
        "Failed to delete experience.",
        "error"
      );

    }

    finally {

      setLoading(false);

      setShowModal(false);

      setDeleteId(null);

    }

  };

  const columns = [

    {

      key: "logo",

      label: "Logo",

      render: (experience) => (

        <img
          src={experience.logo}
          alt={experience.company}
          className="projectThumb"
        />

      ),

    },

    {

      key: "company",

      label: "Company",

    },

    {

      key: "role",

      label: "Role",

    },

    {

      key: "duration",

      label: "Duration",

    },

    {

      key: "order",

      label: "Order",

    },

  ];

  return (

    <>

      <DataTable

        columns={columns}

        data={experiences}

        actions={(experience) => (

          <div className="actionButtons">

            <button

              className="editBtn"

              onClick={() => onEdit(experience)}

            >

              Edit

            </button>

            <button

              className="deleteBtn"

              onClick={() =>
                handleDeleteClick(experience._id)
              }

            >

              Delete

            </button>

          </div>

        )}

      />

      <ConfirmModal

        isOpen={showModal}

        title="Delete Experience"

        message="Are you sure you want to delete this experience? This action cannot be undone."

        loading={loading}

        onCancel={() => {

          setShowModal(false);

          setDeleteId(null);

        }}

        onConfirm={confirmDelete}

      />

      <Notification

        visible={notification.visible}

        message={notification.message}

        type={notification.type}

      />

    </>

  );

}

export default ExperienceTable;