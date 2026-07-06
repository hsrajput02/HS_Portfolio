import { useState } from "react";

function useNotification() {

  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showNotification = (
    message,
    type = "success"
  ) => {

    setNotification({
      visible: true,
      message,
      type,
    });

    setTimeout(() => {

      setNotification((prev) => ({
        ...prev,
        visible: false,
      }));

    }, 3000);

  };

  return {
    notification,
    showNotification,
  };

}

export default useNotification;