import "./ConfirmModal.css";

function ConfirmModal({

  isOpen,

  title,

  message,

  onConfirm,

  onCancel,

  loading = false,

}) {

  if (!isOpen) return null;

  return (

    <div className="modalOverlay">

      <div className="confirmModal">

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modalButtons">

          <button

            className="cancelBtn"

            onClick={onCancel}

            disabled={loading}

          >

            Cancel

          </button>

          <button

            className="deleteBtn"

            onClick={onConfirm}

            disabled={loading}

          >

            {loading ? "Deleting..." : "Delete"}

          </button>

        </div>

      </div>

    </div>

  );

}

export default ConfirmModal;