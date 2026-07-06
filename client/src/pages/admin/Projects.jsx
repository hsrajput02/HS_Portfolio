import { useEffect, useState } from "react";

import ProjectForm from "../../components/admin/ProjectForm";
import ProjectTable from "../../components/admin/ProjectTable";

import { getProjects } from "../../services/projectService";
import SearchBar from "../../components/admin/common/SearchBar";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [search,setSearch]=useState("");

  const [selectedProject, setSelectedProject] = useState(null);

  const loadProjects = async () => {

    const res = await getProjects();

    setProjects(res.data);

  };

  useEffect(() => {

    loadProjects();

  }, []);

  const filteredProjects = projects.filter((project)=>{

    return(

        project.title
        .toLowerCase()
        .includes(search.toLowerCase())

    );

});

  return (

    <>

      <SearchBar

    value={search}

    onChange={setSearch}

    placeholder="Search Project..."

/>
      <ProjectForm
        refresh={loadProjects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />

      <br />

      <ProjectTable
        projects={filteredProjects}
        refresh={loadProjects}
        onEdit={setSelectedProject}
      />

    </>

  );

}

export default Projects;