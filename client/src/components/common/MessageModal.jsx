import { useEffect } from "react";
import "./MessageModal.css";

function MessageModal({
  isOpen,
  message,
  onClose,
}) {

  useEffect(() => {

    const handleEsc = (e) => {

      if (e.key === "Escape") {

        onClose();

      }

    };

    window.addEventListener("keydown", handleEsc);

    return () => {

      window.removeEventListener(
        "keydown",
        handleEsc
      );

    };

  }, [onClose]);

  if (!isOpen || !message) return null;

  return (

    <div
      className="messageModalOverlay"
      onClick={onClose}
    >

      <div
        className="messageModal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="messageHeader">

          <h2>📩 Message Details</h2>

        </div>

        <div className="messageContent">

          <div className="messageField">

            <span className="fieldLabel">

              👤 Name

            </span>

            <p>{message.name}</p>

          </div>

          <div className="messageField">

            <span className="fieldLabel">

              📧 Email

            </span>

            <p>{message.email}</p>

          </div>

          <div className="messageField">

            <span className="fieldLabel">

              📝 Subject

            </span>

            <p>{message.subject}</p>

          </div>

          <div className="messageField">

            <span className="fieldLabel">

              🕒 Received

            </span>

            <p>

              {new Date(
                message.createdAt
              ).toLocaleString()}

            </p>

          </div>

          <div className="messageBody">

            <span className="fieldLabel">

              💬 Message

            </span>

            <div className="messageText">

              {message.message}

            </div>

          </div>

        </div>

        <div className="messageFooter">

          <button
            className="closeBtn"
            onClick={onClose}
          >

            Close

          </button>

        </div>

      </div>

    </div>

  );

}

export default MessageModal;