import axios from "axios";
import API_BASE_URL from "../api/api";

export const downloadCSV = async (candidates) => {
  const response = await axios.post(
    `${API_BASE_URL}/download-csv`,
    candidates,
    {
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
};