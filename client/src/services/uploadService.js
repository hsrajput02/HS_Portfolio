import api from "./api";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
});

export const uploadFile = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/upload/file",
    formData,
    getAuthHeader()
  );

  return response.data;

};