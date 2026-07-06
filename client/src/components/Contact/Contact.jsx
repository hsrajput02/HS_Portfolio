import "./Contact.css";

import { useState } from "react";
import { motion } from "framer-motion";

import useSettings from "../../hooks/useSettings";

import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

import LoadingButton from "../admin/common/LoadingButton";

import { sendMessage } from "../../services/messageService";

import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../../animations/variants";

import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

function Contact() {

  const { settings } = useSettings();

  const [loading, setLoading] = useState(false);

  const {

    notification,

    showNotification,

  } = useNotification();

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    subject: "",

    message: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const resetForm = () => {

    setFormData({

      name: "",

      email: "",

      subject: "",

      message: "",

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await sendMessage(formData);

      showNotification(

        "Message sent successfully!",

        "success"

      );

      resetForm();

    }

    catch (error) {

      console.error(error);

      showNotification(

        error.response?.data?.message ||

        "Failed to send message.",

        "error"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <>

      <section

        id="contact"

        className="contact"

      >

        <motion.h2

          className="sectionTitle"

          variants={fadeUp}

          initial="hidden"

          whileInView="visible"

          viewport={{

            once:true,

            amount:.3,

          }}

        >

          Contact Me

        </motion.h2>

        <div className="contactContainer">

          {/* LEFT */}

          <motion.div

            className="contactInfo"

            variants={fadeLeft}

            initial="hidden"

            whileInView="visible"

            viewport={{

              once:true,

            }}

          >

            <h3>

              Let's Work Together

            </h3>

            <p>

              Feel free to contact me for internships,

              freelance work, collaborations or exciting

              project opportunities.

            </p>

            <motion.div

              className="contactList"

              variants={staggerContainer}

              initial="hidden"

              whileInView="visible"

              viewport={{

                once:true,

              }}

            >

              <motion.div

                className="contactItem"

                variants={staggerItem}

              >

                <FaEnvelope />

                <span>

                  {settings?.email ||

                    "hsrajput38108@gmail.com"}

                </span>

              </motion.div>

              <motion.div

                className="contactItem"

                variants={staggerItem}

              >

                <FaPhone />

                <span>

                  {settings?.phone ||

                    "+91 7827170168"}

                </span>

              </motion.div>

              <motion.div

                className="contactItem"

                variants={staggerItem}

              >

                <FaLocationDot />

                <span>

                  {settings?.location ||

                    "Greater Noida, India"}

                </span>

              </motion.div>

            </motion.div>

            <motion.div

              className="contactSocial"

              variants={staggerContainer}

              initial="hidden"

              whileInView="visible"

            >

              <motion.a

                variants={staggerItem}

                whileHover={{

                  scale:1.15,

                  y:-4,

                }}

                href={`https://wa.me/${settings?.whatsapp || "7827170168"}`}

                target="_blank"

                rel="noopener noreferrer"

              >

                <FaWhatsapp />

              </motion.a>

              <motion.a

                variants={staggerItem}

                whileHover={{

                  scale:1.15,

                  y:-4,

                }}

                href={settings?.linkedin || "#"}

                target="_blank"

                rel="noopener noreferrer"

              >

                <FaLinkedin />

              </motion.a>

              <motion.a

                variants={staggerItem}

                whileHover={{

                  scale:1.15,

                  y:-4,

                }}

                href={settings?.instagram || "#"}

                target="_blank"

                rel="noopener noreferrer"

              >

                <FaInstagram />

              </motion.a>

            </motion.div>

          </motion.div>

          {/* RIGHT */}

          <motion.form

            className="contactForm"

            onSubmit={handleSubmit}

            variants={fadeRight}

            initial="hidden"

            whileInView="visible"

            viewport={{

              once:true,

            }}

          >

            <input

              type="text"

              name="name"

              placeholder="Your Name"

              value={formData.name}

              onChange={handleChange}

              required

            />

            <input

              type="email"

              name="email"

              placeholder="Your Email"

              value={formData.email}

              onChange={handleChange}

              required

            />

            <input

              type="text"

              name="subject"

              placeholder="Subject"

              value={formData.subject}

              onChange={handleChange}

              required

            />

            <textarea

              rows="6"

              name="message"

              placeholder="Your Message"

              value={formData.message}

              onChange={handleChange}

              required

            />

            <LoadingButton

              loading={loading}

              text="Send Message"

              loadingText="Sending..."

            />

          </motion.form>

        </div>

      </section>

      <Notification

        visible={notification.visible}

        message={notification.message}

        type={notification.type}

      />

    </>

  );

}

export default Contact;