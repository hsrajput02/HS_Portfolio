import api from "./api";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getExperiences = async () => {
  const response = await api.get("/experiences");
  return response.data;
};

export const addExperience = async (experience) => {
  const response = await api.post(
    "/experiences",
    experience,
    getAuthHeader()
  );
  return response.data;
};

export const updateExperience = async (id, experience) => {
  const response = await api.put(
    `/experiences/${id}`,
    experience,
    getAuthHeader()
  );
  return response.data;
};

export const deleteExperience = async (id) => {
  const response = await api.delete(
    `/experiences/${id}`,
    getAuthHeader()
  );
  return response.data;
};