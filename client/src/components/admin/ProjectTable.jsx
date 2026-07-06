import { useState } from "react";

import DataTable from "./common/DataTable";
import ConfirmModal from "../common/ConfirmModal";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

import { deleteProject } from "../../services/projectService";

function ProjectTable({
  projects,
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

      await deleteProject(deleteId);

      showNotification(
        "Project deleted successfully!",
        "success"
      );

      refresh();

    }

    catch (error) {

      console.error(error);

      showNotification(
        error.response?.data?.message ||
        "Failed to delete project.",
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
      key: "image",

      label: "Image",

      render: (project) => (

        <img
          src={project.image}
          alt={project.title}
          className="projectThumb"
        />

      ),

    },

    {

      key: "title",

      label: "Project Title",

    },

    {

      key: "technologies",

      label: "Technologies",

      render: (project) =>

        project.technologies.join(", "),

    },

    {

      key: "featured",

      label: "Featured",

      render: (project) => (

        <span

          className={

            project.featured

              ? "featuredYes"

              : "featuredNo"

          }

        >

          {project.featured ? "Yes" : "No"}

        </span>

      ),

    },

  ];

  return (

    <>

      <DataTable

        columns={columns}

        data={projects}

        actions={(project) => (

          <div className="actionButtons">

            <button

              className="editBtn"

              onClick={() => onEdit(project)}

            >

              Edit

            </button>

            <button

              className="deleteBtn"

              onClick={() =>

                handleDeleteClick(project._id)

              }

            >

              Delete

            </button>

          </div>

        )}

      />

      <ConfirmModal

        isOpen={showModal}

        title="Delete Project"

        message="Are you sure you want to delete this project? This action cannot be undone."

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

export default ProjectTable;