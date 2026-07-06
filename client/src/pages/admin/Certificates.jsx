import { useEffect, useState } from "react";

import SearchBar from "../../components/admin/common/SearchBar";
import CertificateForm from "../../components/admin/CertificateForm";
import CertificateTable from "../../components/admin/CertificateTable";

import {
  getCertificates,
} from "../../services/certificateService";

function Certificates() {

  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [search, setSearch] = useState("");

  const loadCertificates = async () => {

    try {

      const res = await getCertificates();

      setCertificates(res.data.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadCertificates();

  }, []);

  const filteredCertificates = certificates.filter((certificate) =>
    certificate.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <>

      <SearchBar

        value={search}

        onChange={setSearch}

        placeholder="Search Certificate..."

      />

      <CertificateForm

        refresh={loadCertificates}

        selectedCertificate={selectedCertificate}

        setSelectedCertificate={setSelectedCertificate}

      />

      <br />

      <CertificateTable

        certificates={filteredCertificates}

        refresh={loadCertificates}

        onEdit={setSelectedCertificate}

      />

    </>

  );

}

export default Certificates;