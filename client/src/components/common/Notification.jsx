import "./Notification.css";

function Notification({
  message,
  type,
  visible,
}) {

  if (!visible) return null;

  return (

    <div className={`notification ${type}`}>

      {message}

    </div>

  );

}

export default Notification;