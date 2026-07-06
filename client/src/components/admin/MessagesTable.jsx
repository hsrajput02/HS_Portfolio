import { useState } from "react";

import DataTable from "./common/DataTable";
import ConfirmModal from "../common/ConfirmModal";
import MessageModal from "../common/MessageModal";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

import {
  deleteMessage,
  markAsRead,
} from "../../services/messageService";

function MessagesTable({
  messages,
  refresh,
}) {

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [loadingDelete, setLoadingDelete] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState(null);

  const [showViewer, setShowViewer] = useState(false);

  const {
    notification,
    showNotification,
  } = useNotification();

  // Delete Message
  const handleDeleteClick = (id) => {

    setDeleteId(id);

    setShowDeleteModal(true);

  };

  const confirmDelete = async () => {

    setLoadingDelete(true);

    try {

      await deleteMessage(deleteId);

      showNotification(
        "Message deleted successfully!",
        "success"
      );

      refresh();

    }

    catch (error) {

      console.error(error);

      showNotification(
        error.response?.data?.message ||
        "Failed to delete message.",
        "error"
      );

    }

    finally {

      setLoadingDelete(false);

      setShowDeleteModal(false);

      setDeleteId(null);

    }

  };

  // View Message
  const viewMessage = async (message) => {

    setSelectedMessage(message);

    setShowViewer(true);

    if (!message.isRead) {

      try {

        await markAsRead(message._id);

        refresh();

      }

      catch (error) {

        console.error(error);

      }

    }

  };

  const columns = [

    {
      key: "name",
      label: "Name",
    },

    {
      key: "email",
      label: "Email",
    },

    {
      key: "subject",
      label: "Subject",
    },

    {
      key: "message",
      label: "Message",

      render: (message) =>

        message.message.length > 40
          ? message.message.substring(0, 40) + "..."
          : message.message,

    },

    {
      key: "isRead",
      label: "Status",

      render: (message) => (

        <span
          className={
            message.isRead
              ? "featuredYes"
              : "featuredNo"
          }
        >

          {message.isRead
            ? "Read"
            : "Unread"}

        </span>

      ),

    },

  ];

  return (

    <>

      <DataTable

        columns={columns}

        data={messages}

        actions={(message) => (

          <div className="actionButtons">

            <button

              className="editBtn"

              onClick={() => viewMessage(message)}

            >

              View

            </button>

            <button

              className="deleteBtn"

              onClick={() =>
                handleDeleteClick(message._id)
              }

            >

              Delete

            </button>

          </div>

        )}

      />

      <MessageModal

        isOpen={showViewer}

        message={selectedMessage}

        onClose={() => {

          setShowViewer(false);

          setSelectedMessage(null);

        }}

      />

      <ConfirmModal

        isOpen={showDeleteModal}

        title="Delete Message"

        message="Are you sure you want to delete this message? This action cannot be undone."

        loading={loadingDelete}

        onCancel={() => {

          setShowDeleteModal(false);

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

export default MessagesTable;