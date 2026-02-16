export const compareAssignments = async (files) => {
  const formData = new FormData();

  // Validate files
  if (!files || files.length < 2) {
    throw new Error("Please upload at least 2 files.");
  }

  files.forEach((file) => {
    if (!(file instanceof File)) {
      throw new Error("Invalid file detected.");
    }
    formData.append("files", file);
  });

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000); // 2 min timeout

    const response = await fetch("http://127.0.0.1:8000/compare", {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("Invalid JSON response from backend.");
    }

    if (!response.ok) {
      console.error("Backend error details:", data);
      throw new Error(data.detail || "Backend returned an error.");
    }

    return data;

  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Backend took too long.");
    }

    console.error("Network/Fetch error:", error);
    throw new Error("Backend connection failed. Is the server running?");
  }
};
