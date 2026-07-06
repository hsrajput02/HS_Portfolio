import { useEffect, useState } from "react";

import AdminForm from "./common/AdminForm";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

import { uploadFile } from "../../services/uploadService";

import {
  addExperience,
  updateExperience,
} from "../../services/experienceService";

function ExperienceForm({
  refresh,
  selectedExperience,
  setSelectedExperience,
}) {

  const [loading, setLoading] = useState(false);

  const {
    notification,
    showNotification,
  } = useNotification();

  const [logoFile, setLogoFile] = useState(null);

  const [experience, setExperience] = useState({

    company: "",

    role: "",

    duration: "",

    description: "",

    logo: "",

    order: 0,

  });

  useEffect(() => {

    if (selectedExperience) {

      setExperience(selectedExperience);

    }

  }, [selectedExperience]);

  const handleChange = (e) => {

    setExperience({

      ...experience,

      [e.target.name]: e.target.value,

    });

  };

  const resetForm = () => {

    setExperience({

      company: "",

      role: "",

      duration: "",

      description: "",

      logo: "",

      order: 0,

    });

    setLogoFile(null);

    setSelectedExperience(null);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      let logoUrl = experience.logo;

      if (logoFile) {

        const uploadResponse = await uploadFile(
          logoFile
        );

        logoUrl = uploadResponse.fileUrl;

      }

      const payload = {

        company: experience.company,

        role: experience.role,

        duration: experience.duration,

        description: experience.description,

        logo: logoUrl,

        order: experience.order,

      };

      if (selectedExperience) {

        await updateExperience(
          selectedExperience._id,
          payload
        );

        showNotification(
          "Experience updated successfully!",
          "success"
        );

      }

      else {

        await addExperience(payload);

        showNotification(
          "Experience added successfully!",
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

        "Failed to save experience.",

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

        title="Experience Details"

        onSubmit={handleSubmit}

        buttonText={

          selectedExperience

            ? "Update Experience"

            : "Add Experience"

        }

        loading={loading}

        loadingText={

          selectedExperience

            ? "Updating Experience..."

            : "Adding Experience..."

        }

      >

        <label className="formLabel">
          Company
        </label>

        <input

          name="company"

          placeholder="Company"

          value={experience.company}

          onChange={handleChange}

          required

        />

        <label className="formLabel">
          Role
        </label>
        <input

          name="role"

          placeholder="Role"

          value={experience.role}

          onChange={handleChange}

          required

        />

        <label className="formLabel">
          Duration
        </label>
        <input

          name="duration"

          placeholder="Duration"

          value={experience.duration}

          onChange={handleChange}

          required

        />

        <label className="formLabel">
          Description
        </label>

        <textarea

          name="description"

          placeholder="Description"

          value={experience.description}

          onChange={handleChange}

          required

        />

        <label className="formLabel">
          Order
        </label>
        <input

          type="number"

          name="order"

          min="0"

          value={experience.order}

          onChange={handleChange}

        />

        <label className="formLabel">
          Company Logo
        </label>
        <input

          type="file"

          accept="image/*"

          onChange={(e) =>
            setLogoFile(e.target.files[0])
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

export default ExperienceForm;