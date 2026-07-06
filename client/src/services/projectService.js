import api from "./api";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const addProject = async (project) => {
  const response = await api.post(
    "/projects",
    project,
    getAuthHeader()
  );
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(
    `/projects/${id}`,
    getAuthHeader()
  );
  return response.data;
};

export const updateProject = async (id, project) => {
  const response = await api.put(
    `/projects/${id}`,
    project,
    getAuthHeader()
  );
  return response.data;
};