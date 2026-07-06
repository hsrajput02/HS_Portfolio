import api from "../services/api";

export const getSkills = () =>
    api.get("/skills");

export const getProjects = () =>
    api.get("/projects");

export const getExperiences = () =>
    api.get("/experiences");

export const getCertificates = () =>
    api.get("/certificates");

export const getSettings = () =>
    api.get("/settings");

export const getStats = () =>
    api.get("/stats");

export const updateStats = (data) =>
    api.put("/stats", data);