import axios from "axios";
import API_BASE_URL from "../api/api";

export const downloadCSV = async (candidateIds) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/download-csv`,
      candidateIds,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Candidate_Report.csv");

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("CSV download failed:", error);
    throw error;
  }
};