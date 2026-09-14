import axios from "axios";
import API_BASE_URL from "../api/api";

export const downloadReport = async (candidate) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/download-report`,
      {
        candidate_id: candidate.id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);

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
  } catch (error) {
    console.error(
      "PDF download failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};