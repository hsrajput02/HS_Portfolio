import api from "./api";

export const sendMessage = (data) =>
  api.post("/messages", data);

export const getMessages = () =>
  api.get("/messages");

export const deleteMessage = (id) =>
  api.delete(`/messages/${id}`);

export const markAsRead = (id) =>
  api.put(`/messages/${id}/read`);