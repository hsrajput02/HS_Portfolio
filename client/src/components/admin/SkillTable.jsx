import { useState } from "react";

import DataTable from "./common/DataTable";
import ConfirmModal from "../common/ConfirmModal";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

import { deleteSkill } from "../../services/skillService";

function SkillTable({
  skills,
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

      await deleteSkill(deleteId);

      showNotification(
        "Skill deleted successfully!",
        "success"
      );

      refresh();

    }

    catch (error) {

      console.error(error);

      showNotification(
        error.response?.data?.message ||
        "Failed to delete skill.",
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
      key: "name",
      label: "Skill",
    },

    {
      key: "icon",
      label: "Icon",
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

        data={skills}

        actions={(skill) => (

          <div className="actionButtons">

            <button

              className="editBtn"

              onClick={() => onEdit(skill)}

            >

              Edit

            </button>

            <button

              className="deleteBtn"

              onClick={() =>
                handleDeleteClick(skill._id)
              }

            >

              Delete

            </button>

          </div>

        )}

      />

      <ConfirmModal

        isOpen={showModal}

        title="Delete Skill"

        message="Are you sure you want to delete this skill? This action cannot be undone."

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

export default SkillTable;