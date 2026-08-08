import axios from "axios";
import API_BASE_URL from "../api/api";

export const uploadResume = async (resumeFiles, jdFile) => {
  const formData = new FormData();

  // Append all resumes
  resumeFiles.forEach((file) => {
    formData.append("resume", file);
  });

  // Append Job Description
  formData.append("jd", jdFile);

  const response = await axios.post(
    `${API_BASE_URL}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ===========================
// Download Candidate PDF Report
// ===========================

export const downloadReport = async (candidate) => {
  const response = await axios.post(
    `${API_BASE_URL}/download-report`,
    candidate,
    {
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(new Blob([response.data]));

  const link = document.createElement("a");

  link.href = url;

  link.setAttribute(
    "download",
    `${candidate.name || "Candidate"}_Report.pdf`
  );

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};