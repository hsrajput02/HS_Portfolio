import { useEffect, useState } from "react";

import ExperienceForm from "../../components/admin/ExperienceForm";
import ExperienceTable from "../../components/admin/ExperienceTable";

import { getExperiences } from "../../services/experienceService";
import SearchBar from "../../components/admin/common/SearchBar";
function Experience() {

    const [experiences, setExperiences] = useState([]);

    const [selectedExperience, setSelectedExperience] = useState(null);
    const [search, setSearch] = useState("");
    const loadExperiences = async () => {

        const res = await getExperiences();

        setExperiences(res.data);

    };

    useEffect(() => {

        loadExperiences();

    }, []);

    const filteredExperiences = experiences.filter((experience) =>
  experience.company
    .toLowerCase()
    .includes(search.toLowerCase())
);
    return (

        <>
            <SearchBar
  value={search}
  onChange={setSearch}
  placeholder="Search Experience..."
/>

            <ExperienceForm

                refresh={loadExperiences}

                selectedExperience={selectedExperience}

                setSelectedExperience={setSelectedExperience}

            />

            <br />

            <ExperienceTable

                experiences={filteredExperiences}

                refresh={loadExperiences}

                onEdit={setSelectedExperience}

            />

        </>

    );

}

export default Experience;