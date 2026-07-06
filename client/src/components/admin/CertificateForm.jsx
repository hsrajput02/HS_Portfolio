import { useEffect, useState } from "react";

import AdminForm from "./common/AdminForm";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

import { uploadFile } from "../../services/uploadService";

import {
  addCertificate,
  updateCertificate,
} from "../../services/certificateService";

function CertificateForm({
  refresh,
  selectedCertificate,
  setSelectedCertificate,
}) {

  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState(null);

  const {
    notification,
    showNotification,
  } = useNotification();

  const [certificate, setCertificate] = useState({

    title: "",

    issuer: "",

    issueDate: "",

    credentialId: "",

    credentialUrl: "",

    image: "",

    order: 0,

  });

  useEffect(() => {

    if (selectedCertificate) {

      setCertificate(selectedCertificate);

    }

  }, [selectedCertificate]);

  const handleChange = (e) => {

    setCertificate({

      ...certificate,

      [e.target.name]: e.target.value,

    });

  };

  const resetForm = () => {

    setCertificate({

      title: "",

      issuer: "",

      issueDate: "",

      credentialId: "",

      credentialUrl: "",

      image: "",

      order: 0,

    });

    setImageFile(null);

    setSelectedCertificate(null);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      let imageUrl = certificate.image;

      if (imageFile) {

        const uploadResponse = await uploadFile(
          imageFile
        );

        imageUrl = uploadResponse.fileUrl;

      }

      const payload = {

        ...certificate,

        image: imageUrl,

      };

      if (selectedCertificate) {

        await updateCertificate(
          selectedCertificate._id,
          payload
        );

        showNotification(
          "Certificate updated successfully!",
          "success"
        );

      }

      else {

        await addCertificate(payload);

        showNotification(
          "Certificate added successfully!",
          "success"
        );

      }

      refresh();

      resetForm();

    }

    catch (error) {

      console.error(error);

      showNotification(

        error.response?.data?.message ||

        "Failed to save certificate.",

        "error"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <>

      <AdminForm

        title="Certificate"

        onSubmit={handleSubmit}

        buttonText={

          selectedCertificate

            ? "Update Certificate"

            : "Add Certificate"

        }

        loading={loading}

        loadingText={

          selectedCertificate

            ? "Updating Certificate..."

            : "Adding Certificate..."

        }

      >

        <label className="formLabel">
          Certificate Title
        </label>

        <input

          name="title"

          placeholder="Certificate Title"

          value={certificate.title}

          onChange={handleChange}

          required

        />

        <label className="formLabel">
          Issuer Organization
        </label>

        <input

          name="issuer"

          placeholder="Issuer"

          value={certificate.issuer}

          onChange={handleChange}

          required

        />

        <label className="formLabel">
          Issue Date
        </label>

        <input

          name="issueDate"

          placeholder="Issue Date"

          value={certificate.issueDate}

          onChange={handleChange}

          required

        />

        <label className="formLabel">
          Credential ID
        </label>

        <input

          name="credentialId"

          placeholder="Credential ID"

          value={certificate.credentialId}

          onChange={handleChange}

        />

        <label className="formLabel">
          Credential URL
        </label>

        <input

          name="credentialUrl"

          placeholder="Credential URL"

          value={certificate.credentialUrl}

          onChange={handleChange}

        />

        <input

          type="number"

          name="order"

          min="0"

          value={certificate.order}

          onChange={handleChange}

        />

        <label className="formLabel">
          Certificate Image
        </label>

        <input

          type="file"

          accept="image/*"

          onChange={(e) =>
            setImageFile(e.target.files[0])
          }

        />

      </AdminForm>

      <Notification

        visible={notification.visible}

        message={notification.message}

        type={notification.type}

      />

    </>

  );

}

export default CertificateForm;