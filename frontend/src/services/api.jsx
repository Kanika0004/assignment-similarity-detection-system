import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const compareAssignments = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await API.post("/compare", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
