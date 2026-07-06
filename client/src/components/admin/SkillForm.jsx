import { useEffect, useState } from "react";

import AdminForm from "./common/AdminForm";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";
import iconMap from "../../utils/iconMap";
import {
  addSkill,
  updateSkill,
} from "../../services/skillService";

function SkillForm({
  refresh,
  selectedSkill,
  setSelectedSkill,
}) {

  const [loading, setLoading] = useState(false);
  const {
    notification,
    showNotification,
  } = useNotification();

  const [skill, setSkill] = useState({

    name: "",

    icon: "",

    order: 0,

  });

  useEffect(() => {

    if (selectedSkill) {

      setSkill(selectedSkill);

    }

  }, [selectedSkill]);

  const PreviewIcon = iconMap[skill.icon];

  const handleChange = (e) => {

    setSkill({

      ...skill,

      [e.target.name]: e.target.value,

    });

  };

  const resetForm = () => {

    setSkill({

      name: "",

      icon: "",

      order: 0,

    });

    setSelectedSkill(null);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      if (selectedSkill) {

        await updateSkill(
          selectedSkill._id,
          skill
        );

        showNotification(
          "Skill updated successfully!",
          "success"
        );

      }

      else {

        await addSkill(skill);

        showNotification(
          "Skill added successfully!",
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

        "Failed to save skill.",

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

        title="Skill Details"

        onSubmit={handleSubmit}

        buttonText={

          selectedSkill

            ? "Update Skill"

            : "Add Skill"

        }

        loading={loading}

        loadingText={

          selectedSkill

            ? "Updating Skill..."

            : "Adding Skill..."

        }

      >

        <label className="formLabel">
          Skill Name
        </label>

        <input

          name="name"

          placeholder="Skill Name"

          value={skill.name}

          onChange={handleChange}

          required

        />


        <label className="formLabel">
          Icon Name (from React Icons)
        </label>

        <input

          name="icon"

          placeholder="Icon Name (Example: SiReact)"

          value={skill.icon}

          onChange={handleChange}

          required

        />

        <div
          style={{

            marginTop: "-8px",

            marginBottom: "10px",

            color: "#9ca3af",

            fontSize: "14px",

          }}
        >

          Examples:

          FaJava • SiReact • SiNextdotjs •

          TbBrandCpp • SiSpringboot

        </div>

        <a

          href="https://react-icons.github.io/react-icons/"

          target="_blank"

          rel="noopener noreferrer"

          style={{

            color: "#8b5cf6",

            textDecoration: "none",

            marginBottom: "15px",

            display: "inline-block",

          }}

        >

          🔗 Browse React Icons

        </a>

        {

          skill.icon && (

            <div
              style={{

                display: "flex",

                alignItems: "center",

                gap: "12px",

                marginBottom: "18px",

                color: "white",

                fontSize: "18px",

              }}
            >

              {

                PreviewIcon

                  ? <PreviewIcon />

                  : <span style={{ color: "#ef4444" }}>✕</span>

              }

              <span>

                {

                  PreviewIcon

                    ? skill.icon

                    : <span style={{ color: "#ef4444" }}>Icon Not Found!!</span>

                }

              </span>

            </div>

          )

        }

        <label className="formLabel">
          Order (for display purposes)
        </label>

        <input

          type="number"

          name="order"

          min="0"

          value={skill.order}

          onChange={handleChange}

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

export default SkillForm;