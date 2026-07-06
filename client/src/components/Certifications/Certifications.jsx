import "./Certifications.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Loader from "../common/Loader";
import { getCertificates } from "../../api/portfolioApi";
import CertificateModal from "../common/CertificateModal";

import {
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../../animations/variants";

function Certifications() {

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  useEffect(() => {

    loadCertificates();

  }, []);

  const loadCertificates = async () => {

    try {

      setLoading(true);

      const res = await getCertificates();

      setCertificates(res.data.data);

    }

    catch (err) {

      console.error(err);

      setError("Failed to load certificates.");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <section
      id="certifications"
      className="certifications"
    >

      <motion.h2

        className="sectionTitle"

        variants={fadeUp}

        initial="hidden"

        whileInView="visible"

        viewport={{
          once: true,
          amount: .3,
        }}

      >

        Certifications & Achievements

      </motion.h2>

      {loading && <Loader />}

      {

        error && (

          <p className="statusMessage error">

            {error}

          </p>

        )

      }

      {

        !loading &&
        !error &&
        certificates.length === 0 && (

          <p className="statusMessage">

            No certificates available.

          </p>

        )

      }

      {

        !loading &&
        !error &&
        certificates.length > 0 && (

          <motion.div

            className="certificateGrid"

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{
              once: true,
              amount: .2,
            }}

          >

            {

              certificates.map((certificate) => (

                <motion.div

                  key={certificate._id}

                  className="certificateCard"

                  variants={staggerItem}

                  whileHover={{
                    y: -10,
                    scale: 1.02,
                  }}

                >

                  <div
                    className="certificateImage"
                    onClick={() => setSelectedCertificate(certificate)}
                  >

                    <img
                      src={certificate.image}
                      alt={certificate.title}
                    />

                  </div>

                  <h3>

                    {certificate.title}

                  </h3>

                  <span className="issuerBadge">

                    {certificate.issuer}

                  </span>

                  {certificate.credentialUrl?.trim() && (

                    <a
                      href={certificate.credentialUrl}
                      target="_self"
                      rel="noopener noreferrer"
                      className="certificateLink"
                    >
                      View Credential
                    </a>

                  )}

                </motion.div>

              ))

            }

          </motion.div>

        )

      }

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

    </section>

  );

}

export default Certifications;