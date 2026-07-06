import { useState } from "react";

import DataTable from "./common/DataTable";
import ConfirmModal from "../common/ConfirmModal";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

import { deleteCertificate } from "../../services/certificateService";

function CertificateTable({
  certificates,
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

      await deleteCertificate(deleteId);

      showNotification(
        "Certificate deleted successfully!",
        "success"
      );

      refresh();

    }

    catch (error) {

      console.error(error);

      showNotification(
        error.response?.data?.message ||
        "Failed to delete certificate.",
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

      render: (certificate) => (

        <img
          src={certificate.image}
          alt={certificate.title}
          className="projectThumb"
        />

      ),

    },

    {
      key: "title",
      label: "Certificate",
    },

    {
      key: "issuer",
      label: "Issuer",
    },

    {
      key: "issueDate",
      label: "Issue Date",
    },

  ];

  return (

    <>

      <DataTable

        columns={columns}

        data={certificates}

        actions={(certificate) => (

          <div className="actionButtons">

            <button className="editBtn" onClick={() => onEdit(certificate)} > Edit </button>

            <button className="deleteBtn" onClick={() => handleDeleteClick(certificate._id)} > Delete </button>

          </div>

        )}

      />

      <ConfirmModal

        isOpen={showModal}

        title="Delete Certificate"

        message="Are you sure you want to delete this certificate? This action cannot be undone."

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

export default CertificateTable;