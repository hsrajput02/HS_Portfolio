import "./CertificateModal.css";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

function CertificateModal({ certificate, onClose }) {

    useEffect(() => {

        const handleKey = (e) => {

            if (e.key === "Escape") {

                onClose();

            }

        };

        window.addEventListener("keydown", handleKey);

        return () =>
            window.removeEventListener("keydown", handleKey);

    }, [onClose]);

    return (

        <AnimatePresence>

            {

                certificate && (

                    <motion.div

                        className="certificateModalOverlay"

                        onClick={onClose}

                        initial={{ opacity: 0 }}

                        animate={{ opacity: 1 }}

                        exit={{ opacity: 0 }}

                    >

                        <motion.div

                            className="certificateModal"

                            onClick={(e) => e.stopPropagation()}

                            initial={{

                                scale: .8,

                                opacity: 0,

                            }}

                            animate={{

                                scale: 1,

                                opacity: 1,

                            }}

                            exit={{

                                scale: .8,

                                opacity: 0,

                            }}

                            transition={{

                                duration: .25,

                            }}

                        >

                            <button

                                className="closeModal"

                                onClick={onClose}

                            >

                                <FaTimes />

                            </button>

                            <img

                                src={certificate.image}

                                alt={certificate.title}

                            />

                        </motion.div>

                    </motion.div>

                )

            }

        </AnimatePresence>

    );

}

export default CertificateModal;