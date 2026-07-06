import api from "./api";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getSkills = async () => {
  const response = await api.get("/skills");
  return response.data;
};

export const addSkill = async (skill) => {
  const response = await api.post(
    "/skills",
    skill,
    getAuthHeader()
  );
  return response.data;
};

export const updateSkill = async (id, skill) => {
  const response = await api.put(
    `/skills/${id}`,
    skill,
    getAuthHeader()
  );
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await api.delete(
    `/skills/${id}`,
    getAuthHeader()
  );
  return response.data;
};