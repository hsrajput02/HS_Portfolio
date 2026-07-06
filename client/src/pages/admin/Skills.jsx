import { useEffect, useState } from "react";

import SkillForm from "../../components/admin/SkillForm";
import SkillTable from "../../components/admin/SkillTable";

import { getSkills } from "../../services/skillService";

function Skills() {

  const [skills, setSkills] = useState([]);

  const [selectedSkill, setSelectedSkill] = useState(null);

  const loadSkills = async () => {

    const res = await getSkills();

    setSkills(res.data);

  };

  useEffect(() => {

    loadSkills();

  }, []);

  return (

    <>

      <SkillForm

        refresh={loadSkills}

        selectedSkill={selectedSkill}

        setSelectedSkill={setSelectedSkill}

      />

      <br />

      <SkillTable

        skills={skills}

        refresh={loadSkills}

        onEdit={setSelectedSkill}

      />

    </>

  );

}

export default Skills;