import { useEffect, useState } from "react";

import AdminForm from "./common/AdminForm";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

import {
  addProject,
  updateProject,
} from "../../services/projectService";

import { uploadFile } from "../../services/uploadService";

function ProjectForm({
  refresh,
  selectedProject,
  setSelectedProject,
}) {

  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const {
    notification,
    showNotification,
  } = useNotification();

  const [project, setProject] = useState({

    title: "",

    description: "",

    technologies: "",

    github: "",

    liveDemo: "",

    image: "",

    featured: true,

  });

  useEffect(() => {

    if (selectedProject) {

      setProject({

        title: selectedProject.title,

        description: selectedProject.description,

        technologies:
          selectedProject.technologies.join(", "),

        github: selectedProject.github,

        liveDemo: selectedProject.liveDemo,

        image: selectedProject.image,

        featured: selectedProject.featured,

      });

    }

  }, [selectedProject]);

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setProject({

      ...project,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    });

  };

  const resetForm = () => {

    setProject({

      title: "",

      description: "",

      technologies: "",

      github: "",

      liveDemo: "",

      image: "",

      featured: true,

    });

    setImageFile(null);

    setSelectedProject(null);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      let imageUrl = project.image;

      if (imageFile) {

        const uploadResponse =
          await uploadFile(imageFile);

        imageUrl = uploadResponse.fileUrl;

      }

      const payload = {

        title: project.title,

        description: project.description,

        technologies: project.technologies

          .split(",")

          .map((tech) => tech.trim())

          .filter(Boolean),

        github: project.github,

        liveDemo: project.liveDemo,

        image: imageUrl,

        featured: project.featured,

      };

      if (selectedProject) {

        await updateProject(
          selectedProject._id,
          payload
        );

        showNotification(
          "Project updated successfully!",
          "success"
        );

      }

      else {

        await addProject(payload);

        showNotification(
          "Project added successfully!",
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

        "Failed to save project.",

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

        title="Project Details"

        onSubmit={handleSubmit}

        buttonText={

          selectedProject

            ? "Update Project"

            : "Add Project"

        }

        loading={loading}

        loadingText={

          selectedProject

            ? "Updating Project..."

            : "Adding Project..."

        }

      >

        <label className="formLabel">
          Project Title
        </label>

        <input

          name="title"

          placeholder="Project Title"

          value={project.title}

          onChange={handleChange}

          required

        />

        <label className="formLabel">
          Description
        </label>

        <textarea

          name="description"

          placeholder="Description"

          value={project.description}

          onChange={handleChange}

          required

        />

        <label className="formLabel">
          Technologies (comma-separated)
        </label>

        <input

          name="technologies"

          placeholder="React, Node, MongoDB"

          value={project.technologies}

          onChange={handleChange}

          required

        />

        <label className="formLabel">
          GitHub URL
        </label>

        <input

          name="github"

          placeholder="GitHub URL"

          value={project.github}

          onChange={handleChange}

        />

        <label className="formLabel">
          Live Demo URL
        </label>

        <input

          name="liveDemo"

          placeholder="Live Demo URL (if available)"

          value={project.liveDemo}

          onChange={handleChange}

        />

        <div className="checkboxGroup">

          <input

            type="checkbox"

            id="featured"

            name="featured"

            checked={project.featured}

            onChange={handleChange}

          />

          <label htmlFor="featured">

            Featured Project

          </label>

        </div>

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

export default ProjectForm;