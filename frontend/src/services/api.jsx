export const compareAssignments = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch("http://127.0.0.1:8000/compare", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  return response.json();
};
